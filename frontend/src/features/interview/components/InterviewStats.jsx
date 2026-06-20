const InterviewStats = ({
    matchScore,
    skillGap,
}) => {
    return (
        <aside className="right-sidebar">
            <h3>Match Score</h3>

            <div className="tags">
                <span>
                    {matchScore}%
                </span>
            </div>

            <h3>Skill Gaps</h3>

            <div className="tags">
                {skillGap?.map(
                    (gap, index) => (
                        <span key={index}>
                            {gap.skills}
                        </span>
                    )
                )}
            </div>
        </aside>
    );
};

export default InterviewStats;