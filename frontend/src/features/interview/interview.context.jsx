import { createContext, useMemo, useState } from "react";

/**
 * Global interview context.
 *
 * @type {import("react").Context<{
 *   loading: boolean;
 *   setLoading: import("react").Dispatch<import("react").SetStateAction<boolean>>;
 *   report: object | null;
 *   setReport: import("react").Dispatch<import("react").SetStateAction<object | null>>;
 * } | null>}
 */
export const InterviewContext = createContext(null);

/**
 * Provides interview-related state throughout the application.
 *
 * @param {Object} props
 * @param {import("react").ReactNode} props.children - Child components.
 * @returns {JSX.Element}
 */
export const InterviewProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [report, setReport] = useState(null);
    const [reports, setReports] = useState([]);

    const value = useMemo(
        () => ({
            loading,
            setLoading,
            report,
            setReport,
            reports,
            setReports
        }),
        [loading, report, reports]
    );

    return (
        <InterviewContext.Provider value={value}>
            {children}
        </InterviewContext.Provider>
    );
};