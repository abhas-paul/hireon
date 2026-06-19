const { GoogleGenAI } = require("@google/genai");
const { z } = require("zod");

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY,
});

/**
 * Interview Report Schema
 */
const interviewReportSchema = z.object({
    title: z
        .string()
        .min(1)
        .describe(
            "A concise professional title for the generated interview report"
        ),

    matchScore: z.number().min(0).max(100),

    technicalQuestions: z
        .array(
            z.object({
                question: z.string().min(1),
                intention: z.string().min(1),
                answer: z.string().min(1),
            })
        )
        .min(5),

    behavioralQuestions: z
        .array(
            z.object({
                question: z.string().min(1),
                intention: z.string().min(1),
                answer: z.string().min(1),
            })
        )
        .min(3),

    skillGap: z
        .array(
            z.object({
                skills: z.string().min(1),
                severity: z.enum(["low", "medium", "high"]),
            })
        )
        .min(1),

    preparationPlan: z
        .array(
            z.object({
                day: z.number().int().positive(),
                focus: z.string().min(1),
                tasks: z.array(z.string().min(1)).min(1),
            })
        )
        .min(5),
});

/**
 * Extract JSON from Gemini response.
 *
 * @param {string} text
 * @returns {Object}
 */
function extractJson(text) {
    const cleaned = text
        .replace(/```json/gi, "")
        .replace(/```/g, "")
        .trim();

    return JSON.parse(cleaned);
}

/**
 * Generate Interview Report
 *
 * @param {Object} params
 * @param {string} params.resume
 * @param {string} params.selfDescription
 * @param {string} params.jobDescription
 * @returns {Promise<Object>}
 */
async function generateInterviewReport({
    resume,
    selfDescription = "",
    jobDescription,
}) {
    if (!resume?.trim()) {
        throw new Error("Resume is required.");
    }

    if (!jobDescription?.trim()) {
        throw new Error("Job description is required.");
    }

    const prompt = `
You are a senior engineering manager and technical interviewer.

Analyze the candidate against the provided job description.

Return ONLY valid JSON.

Requirements:

CRITICAL:
The JSON MUST contain a non-empty "title" field.
The title is REQUIRED.

Examples:
- "Frontend Engineer Interview Preparation Report"
- "Senior React Developer Interview Report"
- "Full Stack Developer Interview Readiness Report",

- Match score must be between 0 and 100.
- Generate exactly 5 technical questions.
- Generate exactly 3 behavioral questions.
- Generate between 2 and 5 skill gaps.
- Generate exactly 5 preparation plan days.
- Questions must be tailored to the candidate profile.
- Avoid generic interview questions.
- Questions should directly relate to the technologies and responsibilities mentioned in the job description.
- Behavioral questions should be based on the candidate's experience.
- Skill gaps should be realistic and justified.
- Preparation plan should directly address identified gaps.

Response format:

{
  "title": "Frontend Engineer Interview Preparation Report",
  "matchScore": 92,
  "technicalQuestions": [
    {
      "question": "",
      "intention": "",
      "answer": ""
    }
  ],
  "behavioralQuestions": [
    {
      "question": "",
      "intention": "",
      "answer": ""
    }
  ],
  "skillGap": [
    {
      "skills": "",
      "severity": "low"
    }
  ],
  "preparationPlan": [
    {
      "day": 1,
      "focus": "",
      "tasks": ["", ""]
    }
  ]
}

JOB DESCRIPTION:
${jobDescription}

RESUME:
${resume}

SELF DESCRIPTION:
${selfDescription}
`;

    let lastError;

    for (let attempt = 1; attempt <= 3; attempt++) {
        try {
            const response = await ai.models.generateContent({
                model: "gemini-3-flash-preview",
                contents: prompt,
                config: {
                    temperature: 0.3,
                    responseMimeType: "application/json",
                },
            });

            const parsed = extractJson(response.text);

            const validated =
                interviewReportSchema.parse(parsed);

            return validated;
        } catch (error) {
            lastError = error;

            console.error(
                `[INTERVIEW REPORT] Attempt ${attempt} failed`
            );

            console.error(error);

            if (attempt < 3) {
                await new Promise(resolve =>
                    setTimeout(resolve, 1000)
                );
            }
        }
    }

    throw new Error(
        `Failed to generate interview report after 3 attempts.\n${lastError?.message}`
    );
}

module.exports = {
    generateInterviewReport,
};