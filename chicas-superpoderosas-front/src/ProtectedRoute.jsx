import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ role, userRole, children }) => {
    if (!userRole) return <Navigate to="/" />;
    if (role && role !== userRole) return <Navigate to="/" />;
    return children;
};

export default ProtectedRoute;
