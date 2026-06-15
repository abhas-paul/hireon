const pdfParse = require("pdf-parse");
const generateInterviewReport = require("../services/ai.service.js");
const InterviewReport = require("../models/report.model.js");

/**
 * @route   POST /api/interviews
 * @description Generate an AI interview report from a resume and job details
 * @access  Private
 */
async function createInterviewReport(req, res, next) {
    try {
        if (!req.file) {
            return res.status(400).json({
                message: "Resume file is required",
            });
        }

        const resumeContent = await pdfParse(req.file.buffer);
        const { selfDescription, jobDescription } = req.body;

        const interviewReportByAi = await generateInterviewReport({
            resume: resumeContent.text,
            selfDescription,
            jobDescription,
        });

        const interviewReport = await InterviewReport.create({
            user: req.user.id,
            resume: resumeContent.text,
            selfDescription,
            jobDescription,
            ...interviewReportByAi,
        });

        return res.status(201).json({
            message: "Interview report generated successfully",
            interviewReport,
        });
    } catch (error) {
        next(error);
    }
}

module.exports = { createInterviewReport };