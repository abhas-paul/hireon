import { createContext, useState } from "react";

/**
 * Context object for authentication state.
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
    const [loading, setLoading] = useState(false);

    return (
        <AuthContext.Provider value={{ user, setUser, loading, setLoading }}>
            {children}
        </AuthContext.Provider>
    );
};