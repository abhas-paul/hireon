import { useEffect } from "react";
import { useNavigate } from "react-router";

import { useInterview } from "../hooks/useInterview";

function AllReportsSection() {
    const navigate = useNavigate();

    const {
        reports,
        loading,
        getReports,
    } = useInterview();

    useEffect(() => {
        const fetchReports = async () => {
            try {
                await getReports();
            } catch (error) {
                console.error(
                    "[AllReportsSection] Failed to fetch reports:",
                    error
                );
            }
        };

        fetchReports();
    }, []);

    if (loading) {
        return (
            <section className="reports-section">
                <header className="reports-header">
                    <h2>Your Interview Reports</h2>
                    <p>Loading your reports...</p>
                </header>
            </section>
        );
    }

    if (!reports?.length) {
        return (
            <section className="reports-section">
                <header className="reports-header">
                    <h2>Your Interview Reports</h2>
                    <p>
                        You haven't generated any interview reports yet.
                    </p>
                </header>
            </section>
        );
    }

    return (
        <section className="reports-section">
            <header className="reports-header">
                <h2>Your Interview Reports</h2>

                <p>
                    Review previously generated interview strategies and
                    continue preparing with confidence.
                </p>
            </header>

            <div className="reports-grid">
                {reports.map((report) => (
                    <article
                        key={report._id}
                        className="report-card"
                    >
                        <div className="report-card-top">
                            <h3>{report.title}</h3>

                            <span className="match-score">
                                {report.matchScore}%
                            </span>
                        </div>

                        <div className="report-card-bottom">
                            <p>
                                Generated on{" "}
                                {new Date(
                                    report.createdAt
                                ).toLocaleDateString()}
                            </p>

                            <button
                                type="button"
                                className="btn interview-btn"
                                onClick={() =>
                                    navigate(
                                        `/interview/${report._id}`
                                    )
                                }
                            >
                                Open Report
                            </button>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}

export default AllReportsSection;