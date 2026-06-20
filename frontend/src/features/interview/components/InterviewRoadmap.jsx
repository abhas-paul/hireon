const InterviewRoadmap = ({
    preparationPlan,
}) => {
    return (
        <>
            <h1>Preparation Roadmap</h1>

            {preparationPlan?.map((day) => (
                <div
                    key={day.day}
                    className="question-card"
                >
                    <h3>
                        Day {day.day}: {day.focus}
                    </h3>

                    <ul>
                        {day.tasks?.map(
                            (task, taskIndex) => (
                                <li
                                    key={taskIndex}
                                >
                                    {task}
                                </li>
                            )
                        )}
                    </ul>
                </div>
            ))}
        </>
    );
};

export default InterviewRoadmap;