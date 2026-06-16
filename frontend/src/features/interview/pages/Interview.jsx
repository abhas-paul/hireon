import "../style/interview.scss";

const Interview = () => {
    return (
        <main className="interview-page">
            <aside className="left-sidebar">
                <button>Technical Questions</button>
                <button>Behavioral Questions</button>
                <button>Roadmap</button>
            </aside>

            <section className="content">
                <h1>Technical Questions</h1>

                <div className="question-card">
                    <h3>Explain Event Loop in Node.js</h3>
                    <p>
                        Describe how the event loop handles asynchronous
                        operations and callbacks.
                    </p>
                </div>

                <div className="question-card">
                    <h3>What is Redis?</h3>
                    <p>
                        Explain caching strategies and common Redis use
                        cases.
                    </p>
                </div>
            </section>

            <aside className="right-sidebar">
                <h3>Skill Gaps</h3>

                <div className="tags">
                    <span>Redis</span>
                    <span>Message Queue</span>
                    <span>Event Loop</span>
                    <span>System Design</span>
                </div>
            </aside>
        </main>
    );
};

export default Interview;