require("dotenv").config();

const app = require("./src/app.js");
const connectDB = require("./src/config/db.js");

// const { generateInterviewReport } = require("./src/services/ai.service.js");
// const { jobDescription, resume, selfDescription } = require("./src/samples/test.js");

// generateInterviewReport({ resume, selfDescription, jobDescription })
//     .then(report => console.log("Final Report Data:", report))
//     .catch(err => console.error("Test failed:", err));

connectDB();

PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});