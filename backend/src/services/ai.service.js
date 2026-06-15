const { GoogleGenAI } = require("@google/genai");
const { z } = require("zod");
const { zodToJsonSchema } = require("zod-to-json-schema");

// I am passing the key explicitly, but the SDK will automatically check 
// process.env.GEMINI_API_KEY if left empty.
const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_APIKEY
});

/**
 * @typedef {Object} InterviewReport
 * @property {number} matchScore - How well the candidate matches the job (0-100).
 * @property {Array<{question: string, intention: string, answer: string}>} technicalQuestions - Tailored tech questions.
 * @property {Array<{question: string, intention: string, answer: string}>} behavioralQuestions - Tailored soft-skill questions.
 * @property {Array<{skills: string, severity: 'low'|'medium'|'high'}>} skillGap - Missing skills based on the job desc.
 * @property {Array<{day: number, focus: string, tasks: string[]}>} preparationPlan - Day-by-day study guide to close gaps.
 */

/**
 * My Zod schema that defines the exact JSON structure I want the AI to return.
 * I use this to force Gemini to output structured data that matches my Mongoose model.
 */
const interviewReportSchema = z.object({
    matchScore: z.number().min(0).max(100).description("A score from 0 to 100 indicating how well the candidate matches the job description."),

    technicalQuestions: z.array(z.object({
        question: z.string().description("A technical question to ask the candidate during the interview."),
        intention: z.string().description("The intention of the interviewer behind asking this question."),
        answer: z.string().description("How to answer this question, what points to cover, and what approach to take.")
    })).description("List of technical questions tailored to the candidate's stack and the job description."),

    behavioralQuestions: z.array(z.object({
        question: z.string().description("A behavioral question based on the candidate's experience."),
        intention: z.string().description("What soft skill or past behavior this question evaluates."),
        answer: z.string().description("The ideal way the candidate should structure their response (e.g., STAR method).")
    })).description("List of behavioral questions."),

    skillGap: z.array(z.object({
        skills: z.string().description("The specific skill or technology the candidate is missing based on the job description."),
        severity: z.enum(["low", "medium", "high"]).description("How critical this missing skill is for the role.")
    })).description("Identified gaps between the candidate's resume and the job requirements."),

    preparationPlan: z.array(z.object({
        day: z.number().description("The day number of the preparation plan (e.g., 1, 2, 3)."),
        focus: z.string().description("The main study focus for this day."),
        tasks: z.array(z.string()).description("Actionable tasks the candidate should complete on this day.")
    })).description("A day-by-day study plan to help the candidate close their skill gaps.")
});

/**
 * Generates a structured interview report based on the candidate's profile and job description.
 * * @async
 * @param {Object} params - The candidate and job details.
 * @param {string} params.resume - The candidate's resume or work history.
 * @param {string} params.selfDesc - The candidate's self-description or summary.
 * @param {string} params.jobDesc - The target job description.
 * @returns {Promise<InterviewReport>} The structured report parsed as a JavaScript object.
 * @throws {Error} If the AI fails to generate or parse the content.
 */
async function generateInterviewReport({ resume, selfDesc, jobDesc }) {
    try {
        const prompt = `
You are an expert technical interviewer and career coach.
Analyze the provided candidate details against the job description and generate a comprehensive interview preparation report.

Job Description:
${jobDesc}

Candidate Resume:
${resume}

Candidate Self-Description:
${selfDesc}

Generate a detailed report strictly following the provided JSON schema. Ensure the match score is realistic and the preparation plan directly addresses the identified skill gaps.
`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash-lite",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: zodToJsonSchema(interviewReportSchema)
            }
        });

        // I parse the response text to ensure I return a clean JavaScript object to my frontend/database.
        const reportData = JSON.parse(response.text);

        console.log("Report generated successfully!", reportData);
        return reportData;

    } catch (error) {
        // If the AI fails or parsing breaks, I catch it here so my server doesn't crash.
        console.error("Failed to generate interview report:", error.message);
        throw error;
    }
}

module.exports = { generateInterviewReport };