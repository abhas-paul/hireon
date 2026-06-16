import "../style/home.scss";

const Home = () => {
    return (
        <main className="home">
            <section className="hero">
                <h1>
                    Create Your Custom <span>Interview Plan</span>
                </h1>

                <p>
                    Let our AI analyze the job requirements and your unique
                    profile to build a winning strategy.
                </p>
            </section>

            <section className="interview-card">
                <article className="left">
                    <div className="section-header">
                        <h3>Target Job Description</h3>
                        <span className="badge">Required</span>
                    </div>

                    <textarea
                        id="jobDescription"
                        placeholder="Paste the full job description here..."
                    />
                </article>

                <aside className="right">
                    <div className="section-header">
                        <h3>Your Profile</h3>
                    </div>

                    <label htmlFor="resume" className="upload-box">
                        <input
                            type="file"
                            id="resume"
                            accept=".pdf"
                        />
                        <p>Click to upload your resume</p>
                        <span>PDF only</span>
                    </label>

                    <div className="divider">
                        <span>OR</span>
                    </div>

                    <div className="input-group">
                        <label htmlFor="selfDescription">
                            Quick Self Description
                        </label>

                        <textarea
                            id="selfDescription"
                            placeholder="Describe yourself..."
                        />
                    </div>

                    <button className="generate-btn">
                        Generate Interview Strategy
                    </button>
                </aside>
            </section>
        </main>
    );
};

export default Home;