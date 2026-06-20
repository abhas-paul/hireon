import { useState, useRef } from "react";
import { useNavigate } from "react-router";

import "../style/home.scss";
import { useInterview } from "../hooks/useInterview";

const Home = () => {
    const { loading, generateReport } = useInterview();

    const [jobDescription, setJobDescription] = useState("");
    const [selfDescription, setSelfDescription] = useState("");
    const [resumeFile, setResumeFile] = useState(null);

    const resumeInputRef = useRef(null);

    const navigate = useNavigate();

    const handleGenerateReport = async (e) => {
        e.preventDefault();

        if (!resumeFile) {
            console.error("Resume file is required.");
            return;
        }

        try {
            const data = await generateReport({
                resumeFile,
                selfDescription,
                jobDescription,
            });

            navigate(`/interview/${data._id}`)

        } catch (error) {
            console.error("Generate Report Error:", error);
        }
    };

    return (
        <main className="home">
            <header className="hero">
                <h1>
                    Turn Any Job Description Into an
                    <span> Interview Strategy</span>
                </h1>
            </header>

            <form
                className="interview-card"
                onSubmit={handleGenerateReport}
            >
                <section className="job-section">
                    <label htmlFor="JobDescription">
                        Target Job Description:<span>*</span>
                    </label>

                    <textarea
                        id="JobDescription"
                        name="jobDescription"
                        value={jobDescription}
                        onChange={(e) =>
                            setJobDescription(e.target.value)
                        }
                        required
                        placeholder="Paste/Write The Full Job Description Here......"
                    />
                </section>

                <aside className="profile-section">
                    <section className="resume-section">
                        <label htmlFor="resume">
                            Resume:<span>*</span>
                        </label>

                        <label
                            htmlFor="resume"
                            className="resume-upload"
                        >
                            <svg
                                width="800px"
                                height="800px"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M12 15L12 2M12 2L15 5.5M12 2L9 5.5"
                                    stroke="#00FF33"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M8 22.0002H16C18.8284 22.0002 20.2426 22.0002 21.1213 21.1215C22 20.2429 22 18.8286 22 16.0002V15.0002C22 12.1718 22 10.7576 21.1213 9.8789C20.3529 9.11051 19.175 9.01406 17 9.00195M7 9.00195C4.82497 9.01406 3.64706 9.11051 2.87868 9.87889C2 10.7576 2 12.1718 2 15.0002L2 16.0002C2 18.8286 2 20.2429 2.87868 21.1215C3.17848 21.4213 3.54062 21.6188 4 21.749"
                                    stroke="#00FF33"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                />
                            </svg>

                            <h3>
                                {resumeFile
                                    ? resumeFile.name
                                    : "Upload Your Resume Here"}
                            </h3>

                            <p>PDF Only</p>

                            <input
                                ref={resumeInputRef}
                                type="file"
                                id="resume"
                                name="resume"
                                accept=".pdf"
                                hidden
                                required
                                onChange={(e) =>
                                    setResumeFile(
                                        e.target.files?.[0] || null
                                    )
                                }
                            />
                        </label>
                    </section>

                    <section className="bio-section">
                        <label htmlFor="selfDescription">
                            Quick Self Description:
                            <span>*</span>
                        </label>

                        <textarea
                            id="selfDescription"
                            name="selfDescription"
                            value={selfDescription}
                            onChange={(e) =>
                                setSelfDescription(
                                    e.target.value
                                )
                            }
                            required
                            placeholder="Describe Yourself...."
                        />
                    </section>
                </aside>

                <button
                    disabled={loading}
                    type="submit"
                    className="btn interview-btn"
                >
                    {loading
                        ? "Generating..."
                        : "Generate Strategy"}
                </button>
            </form>
        </main>
    );
};

export default Home;