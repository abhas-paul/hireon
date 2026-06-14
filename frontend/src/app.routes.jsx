import { createBrowserRouter, Navigate } from "react-router";
import { Login, Register, Home } from "./features/auth/pages/index.js";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
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
        element: <Navigate to="/login" replace /> 
    }
]);