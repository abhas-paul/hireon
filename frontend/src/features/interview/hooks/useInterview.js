import { useContext } from "react";

import {
    getAllInterviews,
    getInterviewReportById,
    generateInterviewReport,
} from "../services/interview.api.js";

import { InterviewContext } from "../interview.context.jsx";

/**
 * Interview context hook.
 *
 * @returns {{
 *  loading: boolean,
 *  report: Object | null,
 *  reports: Object[],
 *  generateReport: Function,
 *  getReportById: Function,
 *  getReports: Function
 * }}
 */
export const useInterview = () => {
    const context = useContext(InterviewContext);

    if (!context) {
        throw new Error(
            "useInterview must be used within an InterviewProvider"
        );
    }

    const {
        loading,
        setLoading,
        report,
        setReport,
        reports,
        setReports,
    } = context;

    /**
     * Generate a new interview report.
     *
     * @async
     * @param {Object} params
     * @param {File} params.resumeFile
     * @param {string} params.selfDescription
     * @param {string} params.jobDescription
     *
     * @returns {Promise<Object>}
     */
    const generateReport = async ({
        resumeFile,
        selfDescription,
        jobDescription,
    }) => {
        if (!resumeFile) {
            throw new Error("Resume file is required.");
        }

        if (!selfDescription?.trim()) {
            throw new Error("Self description is required.");
        }

        if (!jobDescription?.trim()) {
            throw new Error("Job description is required.");
        }

        setLoading(true);

        try {
            const response = await generateInterviewReport({
                resumeFile,
                selfDescription,
                jobDescription,
            });

            if (!response?.interviewReport) {
                throw new Error(
                    "Invalid response received from server."
                );
            }

            setReport(response.interviewReport);

            return response.interviewReport;
        } catch (error) {
            const message =
                error?.response?.data?.message ||
                error?.message ||
                "Failed to generate interview report.";

            console.error(
                "[Interview] Generate Report Error:",
                error
            );

            throw new Error(message);
        } finally {
            setLoading(false);
        }
    };

    /**
     * Fetch a report by ID.
     *
     * @async
     * @param {string} interviewId
     *
     * @returns {Promise<Object>}
     */
    const getReportById = async (interviewId) => {
        if (!interviewId?.trim()) {
            throw new Error("Interview ID is required.");
        }

        setLoading(true);

        try {
            const response = await getInterviewReportById(
                interviewId
            );

            if (!response?.interviewReport) {
                throw new Error(
                    "Interview report not found."
                );
            }

            setReport(response.interviewReport);

            return response.interviewReport;
        } catch (error) {
            const message =
                error?.response?.data?.message ||
                error?.message ||
                "Failed to fetch interview report.";

            console.error(
                "[Interview] Get Report Error:",
                error
            );

            throw new Error(message);
        } finally {
            setLoading(false);
        }
    };

    /**
     * Fetch all interview reports.
     *
     * @async
     * @returns {Promise<Object[]>}
     */
    const getReports = async () => {
        setLoading(true);

        try {
            const response = await getAllInterviews();

            const interviewReports =
                response?.interviewReports || [];

            setReports(interviewReports);

            return interviewReports;
        } catch (error) {
            const message =
                error?.response?.data?.message ||
                error?.message ||
                "Failed to fetch interview reports.";

            console.error(
                "[Interview] Get Reports Error:",
                error
            );

            throw new Error(message);
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        report,
        reports,

        generateReport,
        getReportById,
        getReports,
    };
};