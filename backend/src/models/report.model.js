const mongoose = require("mongoose");

// I'm turning off _id for these subdocuments to keep the database clean and avoid unnecessary indexing.
const technicalQuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: [true, "Technical question is required"],
        trim: true
    },
    intention: {
        type: String,
        required: [true, "Intention is required"],
        trim: true
    },
    answer: {
        type: String,
        required: [true, "Answer is required"],
        trim: true
    }
}, { _id: false });

const behavioralQuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: [true, "Behavioral question is required"],
        trim: true
    },
    intention: {
        type: String,
        required: [true, "Intention is required"],
        trim: true
    },
    answer: {
        type: String,
        required: [true, "Answer is required"],
        trim: true
    }
}, { _id: false });

const skillGapSchema = new mongoose.Schema({
    skills: {
        type: String,
        required: [true, "Skills are required"],
        trim: true
    },
    severity: {
        type: String,
        enum: ["low", "medium", "high"],
        required: [true, "Severity is required"]
    }
}, { _id: false });

const preparationPlanSchema = new mongoose.Schema({
    day: {
        type: Number,
        required: [true, "Day is required"],
        min: [1, "Day must be at least 1"]
    },
    focus: {
        type: String,
        required: [true, "Focus is required"],
        trim: true
    },
    tasks: [{
        type: String,
        required: [true, "Task is required"],
        trim: true
    }]
}, { _id: false });

// My main schema. Timestamps are on so I can track exactly when this report was generated.
const interviewReportSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
        trim: true,
    },
    jobDescription: {
        type: String,
        required: [true, "Job description is required"],
        trim: true
    },
    resume: {
        type: String,
        trim: true
    },
    selfDescription: {
        type: String,
        trim: true
    },
    matchScore: {
        type: Number,
        min: [0, "Match score cannot be below 0"],
        max: [100, "Match score cannot exceed 100"]
    },
    // Embedding the subdocuments
    technicalQuestions: [technicalQuestionSchema],
    behavioralQuestions: [behavioralQuestionSchema],
    skillGap: [skillGapSchema],
    preparationPlan: [preparationPlanSchema],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    }
}, { timestamps: true });

const InterviewReport = mongoose.model("InterviewReport", interviewReportSchema);

module.exports = InterviewReport;