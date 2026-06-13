import { createBrowserRouter, Navigate } from "react-router";
import { Login, Register } from "./features/auth/pages/index.js";

export const router = createBrowserRouter([
    {
        path: "/",
        // Redirects users visiting the root URL straight to login
        element: <Navigate to="/login" replace />,
        // Catches any JS crashes in your routes so the whole app doesn't go white
        errorElement: <div>Oops! Something went wrong.</div>, 
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "*",
        // Catches typos in the URL (like /loginssss)
        element: <Navigate to="/login" replace /> 
        // Or you could show a custom 404 page: element: <NotFound />
    }
]);