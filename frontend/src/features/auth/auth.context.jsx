import { createContext, useState, useEffect } from "react";
import { getMe } from "./services/auth.api";

/**
 * Context object for authentication state.
 * @type {React.Context<Object>}
 */
export const AuthContext = createContext(null);

/**
 * Provider component that wraps the app to supply authentication state globally.
 * * @param {Object} props - Component props.
 * @param {React.ReactNode} props.children - The child components to render inside the provider.
 * @returns {JSX.Element} The AuthContext provider wrapping the children.
 */
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        /**
         * Asynchronously fetches the current user session from the API.
         * Updates user state on success, clears it on failure, and manages loading state.
         */
        const fetchUser = async () => {
            try {
                const data = await getMe();
                setUser(data.user);
            } catch (error) {
                console.error("No active session found:", error.message);
                setUser(null);
            } finally {

                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, loading, setLoading }}>
            {children}
        </AuthContext.Provider>
    );
};