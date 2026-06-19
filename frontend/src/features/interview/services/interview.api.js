import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true,
});

/**
 * Generates an AI-powered interview report based on a job description,
 * resume, and self-description.
 *
 * @async
 * @function generateInterviewReport
 * @param {Object} params - Interview generation payload.
 * @param {string} params.jobDescription - Full target job description.
 * @param {string} params.selfDescription - Candidate self-description or summary.
 * @param {File} params.resumeFile - Resume file uploaded by the user.
 *
 * @returns {Promise<Object>} Generated interview report response.
 *
 * @throws {Object} API error response or a generic error object.
 */
export const generateInterviewReport = async ({
    jobDescription,
    selfDescription,
    resumeFile,
}) => {
    try {
        const formData = new FormData();

        formData.append("jobDescription", jobDescription);
        formData.append("selfDescription", selfDescription);
        formData.append("resumeFile", resumeFile);

        const { data } = await api.post(
            "/api/interview",
            formData
        );

        return data;
    } catch (error) {
        throw (
            error?.response?.data || {
                message: "Failed to generate interview report",
            }
        );
    }
};

/**
 * Fetches a specific interview report by its ID.
 *
 * @async
 * @function getInterviewReportById
 * @param {string} interviewId - The unique ID of the interview report.
 *
 * @returns {Promise<Object>} Interview report data.
 *
 * @throws {Object} API error response or a generic error object.
 */
export const getInterviewReportById = async (interviewId) => {
    try {
        const { data } = await api.get(
            `/api/interview/report/${interviewId}`
        );

        return data;
    } catch (error) {
        throw (
            error?.response?.data || {
                message: "Failed to fetch interview report",
            }
        );
    }
};

/**
 * Fetches all interview reports belonging to the authenticated user.
 *
 * @async
 * @function getAllInterviews
 *
 * @returns {Promise<Object>} List of interview reports.
 *
 * @throws {Object} API error response or a generic error object.
 */
export const getAllInterviews = async () => {
    try {
        const { data } = await api.get("/api/interview");

        return data;
    } catch (error) {
        throw (
            error?.response?.data || {
                message: "Failed to fetch interview reports",
            }
        );
    }
};