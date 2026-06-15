const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware.js");
const {
    createInterviewReport
} = require("../controllers/interview.controller.js");
const upload = require("../middlewares/file.middleware.js");

const interviewRouter = express.Router();

/**
 * @route   POST /api/interviews
 * @description Create a new interview session
 * @access  Private
 */
interviewRouter.post(
    "/",
    authMiddleware.authUser,
    upload.single("resume"),
    createInterviewReport,
);

module.exports = interviewRouter;