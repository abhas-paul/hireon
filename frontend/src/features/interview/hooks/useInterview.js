import {
    getAllInterviews,
    getInterviewReportById,
    generateInterviewReport
} from "../services/interview.api.js";
import { useContext } from "react";
import { InterviewContext } from "../interview.context.jsx";

export const useInterview = () => {
    const context = useContext(InterviewContext);

    if (!context) {
        throw new Error("Hook must be used within the InterviewProvider");
    }

    const {
        loading,
        setLoading,
        report,
        setReport,
        reports,
        setReports
    } = context;

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

            setReport(response.interviewReport);

            return response.interviewReport;
        } catch (error) {
            const message =
                error?.message ||
                error?.response?.data?.message ||
                "Failed to generate interview report.";

            console.error("Generate Report Error:", error);
            throw new Error(message);
        } finally {
            setLoading(false);
        }
    };

    const getReportById = async (interviewId) => {
        if (!interviewId?.trim()) {
            throw new Error("Interview ID is required.");
        }

        setLoading(true);

        try {
            const response = await getInterviewReportById(interviewId);

            setReport(response.interviewReport);

            return response.interviewReport;
        } catch (error) {
            const message =
                error?.message ||
                error?.response?.data?.message ||
                "Failed to fetch interview report.";

            console.error("Get Interview Report Error:", error);
            throw new Error(message);
        } finally {
            setLoading(false);
        }
    };

    const getReports = async () => {
        setLoading(true);

        try {
            const response = await getAllInterviews();

            const interviewReports =
                response?.interviewReport || [];

            setReports(interviewReports);

            return interviewReports;
        } catch (error) {
            const message =
                error?.message ||
                error?.response?.data?.message ||
                "Failed to fetch interview reports.";

            console.error("Get Interview Reports Error:", error);

            throw new Error(message);
        } finally {
            setLoading(false);
        }
    };

    return { loading, report, reports, generateReport, getReportById, getReports };
}