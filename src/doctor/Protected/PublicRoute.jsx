import { Navigate } from "react-router-dom";
import Login from "../pages/Login";

const PublicRoute = () => {
    const token = localStorage.getItem("token");

    // If token exists, redirect to dashboard
    if (token) {
        return <Navigate to="/" replace />;
    }

    // Otherwise, show login page
    return <Login />;
};

export default PublicRoute;
