const InterviewQuestions = ({
    title,
    questions,
}) => {
    return (
        <>
            <h1>{title}</h1>

            {questions?.map(
                (question, index) => (
                    <div
                        key={index}
                        className="question-card"
                    >
                        <h3>
                            {question.question}
                        </h3>

                        <p>
                            <strong>
                                Intention:
                            </strong>{" "}
                            {question.intention}
                        </p>

                        <p>
                            <strong>
                                Suggested Answer:
                            </strong>{" "}
                            {question.answer}
                        </p>
                    </div>
                )
            )}
        </>
    );
};

export default InterviewQuestions;