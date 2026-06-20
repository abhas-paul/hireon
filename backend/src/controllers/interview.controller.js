const pdfParse = require("pdf-parse");
const mongoose = require("mongoose");
const { generateInterviewReport } = require("../services/ai.service.js");
const InterviewReport = require("../models/report.model.js");

/**
 * @description Generate an AI inteview report from a resume and job details
 */
async function createInterviewReport(req, res, next) {
    try {
        if (!req.file) {
            return res.status(400).json({
                message: "Resume file is required",
            });
        }

        const resumeContent = await (new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText()
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

/**
 * @description Controller to get interview by interview id
 */
async function getInterviewReportById(req, res) {
    try {
        const { interviewId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(interviewId)) {
            return res.status(400).json({
                message: "Invalid interview report ID",
            });
        }

        const interviewReport = await InterviewReport.findOne({
            _id: interviewId,
            user: req.user.id,
        });

        if (!interviewReport) {
            return res.status(404).json({
                message: "Interview report not found",
            });
        }

        return res.status(200).json({
            message: "Interview report fetched successfully",
            interviewReport,
        });
    } catch (error) {
        console.error("Get Interview Report Error:", error);

        return res.status(500).json({
            message: "Internal server error",
        });
    }
}

/**
 * @description Fetch all interview from a specific user
 */
const getAllInterviews = async (req, res) => {
    try {
        const interviewReports = await InterviewReport.find({
            user: req.user.id,
        })
            .select(
                "-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGap -preparationPlan"
            )
            .sort({ createdAt: -1 })
            .lean();

        return res.status(200).json({
            message: "Interview reports fetched successfully",
            count: interviewReports.length,
            interviewReports,
        });
    } catch (error) {
        console.error("Get All Interviews Error:", error);

        return res.status(500).json({
            message: "Internal server error",
        });
    }
};

module.exports = { createInterviewReport, getInterviewReportById, getAllInterviews};