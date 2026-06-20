import { useState, useEffect } from "react";
import { useParams } from "react-router";

import "../style/interview.scss";

import { useInterview } from "../hooks/useInterview";

import { InterviewStats, InterviewSidebar, InterviewContent } from "../components/index.js";

const Interview = () => {
    const { interviewId } = useParams();

    const {
        report,
        loading,
        getReportById,
    } = useInterview();

    const [activeTab, setActiveTab] =
        useState("technical");

    useEffect(() => {
        if (!report && interviewId) {
            getReportById(interviewId);
        }
    }, [interviewId]);

    if (loading || !report) {
        return (
            <main className="interview-page">
                <section className="content">
                    <h1>Loading Report...</h1>
                </section>
            </main>
        );
    }

    return (
        <main className="interview-page">
            <InterviewSidebar
                activeTab={activeTab}
                setActiveTab={setActiveTab}
            />

            <InterviewContent
                activeTab={activeTab}
                report={report}
            />

            <InterviewStats
                matchScore={report.matchScore}
                skillGap={report.skillGap}
            />
        </main>
    );
};

export default Interview;