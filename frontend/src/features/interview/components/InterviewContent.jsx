import InterviewQuestions from "./InterviewQuestions";
import InterviewRoadmap from "./InterviewRoadmap";

const InterviewContent = ({
    activeTab,
    report,
}) => {
    return (
        <section className="content">
            {activeTab === "technical" && (
                <InterviewQuestions
                    title="Technical Questions"
                    questions={
                        report.technicalQuestions
                    }
                />
            )}

            {activeTab === "behavioral" && (
                <InterviewQuestions
                    title="Behavioral Questions"
                    questions={
                        report.behavioralQuestions
                    }
                />
            )}

            {activeTab === "roadmap" && (
                <InterviewRoadmap
                    preparationPlan={
                        report.preparationPlan
                    }
                />
            )}
        </section>
    );
};

export default InterviewContent;