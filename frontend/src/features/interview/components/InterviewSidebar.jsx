const InterviewSidebar = ({
    activeTab,
    setActiveTab,
}) => {
    return (
        <aside className="left-sidebar">
            <button
                className={
                    activeTab === "technical"
                        ? "active"
                        : ""
                }
                onClick={() =>
                    setActiveTab("technical")
                }
            >
                Technical Questions
            </button>

            <button
                className={
                    activeTab === "behavioral"
                        ? "active"
                        : ""
                }
                onClick={() =>
                    setActiveTab("behavioral")
                }
            >
                Behavioral Questions
            </button>

            <button
                className={
                    activeTab === "roadmap"
                        ? "active"
                        : ""
                }
                onClick={() =>
                    setActiveTab("roadmap")
                }
            >
                Roadmap
            </button>
        </aside>
    );
};

export default InterviewSidebar;