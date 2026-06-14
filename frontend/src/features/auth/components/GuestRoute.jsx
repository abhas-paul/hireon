import { useAuth } from "../hooks/useAuth.js"; 
import { Navigate } from "react-router";

function GuestRoute({ children }) {
    const { loading, user } = useAuth();

    if (loading) {
        return (
            <main>
                <h1>Loading......</h1>
            </main>
        );
    }

    if (user) {
        return <Navigate to="/" replace />; 
    }

    return children;
}

export default GuestRoute;