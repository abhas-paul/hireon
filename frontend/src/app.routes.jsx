import { createBrowserRouter, Navigate } from "react-router";
import { Login, Register } from "./features/auth/pages/index.js";
import { Protected, GuestRoute } from "./features/auth/components/index.js";
import { Home, Interview } from "./features/interview/pages/index.js";

export const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <Protected>
                <Home />
            </Protected>
        ),
        errorElement: <div>Oops! Something went wrong.</div>,
    },
    {
        path: "/login",
        element: (
            <GuestRoute>
                <Login />
            </GuestRoute>
        ),
    },
    {
        path: "/register",
        element: (
            <GuestRoute>
                <Register />
            </GuestRoute>
        ),
    },
    {
        path: "/interview/:interviewId",
        element: (
            <Protected>
                <Interview />
            </Protected>
        ),
    },
    {
        path: "*",
        element: <Navigate to="/login" replace />
    }
]);