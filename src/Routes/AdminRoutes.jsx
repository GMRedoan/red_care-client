import React, { use } from "react";
import { Navigate } from "react-router";
import { AuthContext } from "../Authentication/AuthContex";
import Loading from "../Shared/Loading";

const AdminRoutes = ({ children }) => {
    const { user, userInfo, loading } = use(AuthContext);

    if (loading) return <Loading />;

    if (user && userInfo?.role === "admin") {
        return children;
    }

    return <Navigate to="/dashboard" replace />;
};

export default AdminRoutes;
