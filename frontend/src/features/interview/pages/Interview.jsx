import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";

import "../style/interview.scss";

import { useInterview } from "../hooks/useInterview";

import { InterviewStats, InterviewSidebar, InterviewContent } from "../components/index.js";

const Interview = () => {
    const { interviewId } = useParams();
    const navigate = useNavigate();

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
            <section className="parent-go-home">
                <button className="go-home" onClick={() => navigate("/")}>
                    Go Home
                </button>
            </section>
        </main>
    );
};

export default Interview;