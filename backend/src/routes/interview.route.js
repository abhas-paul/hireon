const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware.js");
const interviewController = require("../controllers/interview.controller.js");
const upload = require("../middlewares/file.middleware.js");

const interviewRouter = express.Router();

/**
 * @route       POST /api/interviews
 * @description Create a new interview session
 * @access      Private
 */
interviewRouter.post("/", authMiddleware.authUser, upload.single("resumeFile"), interviewController.createInterviewReport);

/**
 * @route       GET /api/interview/:interviewId
 * @description get interview report by interviewId,
 * @access      Private
*/
interviewRouter.get("/report/:interviewId", authMiddleware.authUser, interviewController.getInterviewReportById);

/**
 * @route       GET /api/interview/
 * @description get all interview by a specific user
 * @access      Private
*/
interviewRouter.get("/", authMiddleware.authUser, interviewController.getAllInterviews);

module.exports = interviewRouter;