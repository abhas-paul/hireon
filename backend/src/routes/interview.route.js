const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware.js");
const {
    createInterviewReport,
    getInterviewReportById
} = require("../controllers/interview.controller.js");
const upload = require("../middlewares/file.middleware.js");

const interviewRouter = express.Router();

/**
 * @route       POST /api/interviews
 * @description Create a new interview session
 * @access      Private
 */
interviewRouter.post("/", authMiddleware.authUser, upload.single("resume"), createInterviewReport);

/**
 * @route       POST /api/interview/:interviewId
 * @description get interview report by interviewId,
 * @access      Private
*/
interviewRouter.post("/report/:interviewId", authMiddleware.authUser, getInterviewReportById);

module.exports = interviewRouter;