const { GoogleGenAI } = require("@google/genai");
const { z } = require("zod");

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY,
});

const interviewReportSchema = z.object({
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
 * Extract JSON if Gemini wraps it in markdown.
 */
function extractJson(text) {
    const cleaned = text
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

    return JSON.parse(cleaned);
}

/**
 * Generate interview report.
 *
 * @param {Object} params
 * @param {string} params.resume
 * @param {string} params.selfDescription
 * @param {string} params.jobDescription
 * @returns {Promise<Object>}
 */
async function generateInterviewReport({
    resume,
    selfDescription,
    jobDescription,
}) {
    if (!resume?.trim()) {
        throw new Error("Resume is required.");
    }

    if (!jobDescription?.trim()) {
        throw new Error("Job description is required.");
    }

    const prompt = `
You are a senior engineering manager and interviewer.

Analyze the candidate against the job description.

Generate ONLY valid JSON.

Requirements:

- Match score from 0 to 100.
- Exactly 5 technical questions.
- Exactly 3 behavioral questions.
- 2 to 5 skill gaps.
- Exactly 5 preparation plan days.
- Questions must be specific to the candidate profile.
- Avoid generic interview questions.
- Tailor every question to the job requirements.

Response format:

{
  "matchScore": 0,
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
                    temperature: 0.4,
                    responseMimeType: "application/json",
                },
            });

            const rawText = response.text;

            console.log(
                `[INTERVIEW REPORT] Attempt ${attempt}`
            );

            const parsed = extractJson(rawText);

            const validated =
                interviewReportSchema.parse(parsed);

            return validated;
        } catch (error) {
            lastError = error;

            console.error(
                `[INTERVIEW REPORT] Attempt ${attempt} failed`
            );

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