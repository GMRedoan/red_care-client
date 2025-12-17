import React, { use } from "react";
import { Navigate } from "react-router";
import AdminAllRequest from "../DashBoardLayout/DashBoard/Admin/AdminAllRequest";
import Loading from "../Shared/Loading";
import { AuthContext } from "../Authentication/AuthContex";
import VolunteerAllRequest from "../DashBoardLayout/DashBoard/Volunteer/VolunteerAllRequest";

const AllRequestRoutes = () => {
  const { userInfo, loading } = use(AuthContext);

  if (loading) return <Loading></Loading>

  if (userInfo?.role === "admin") {
    return <AdminAllRequest></AdminAllRequest>
  }

  if (userInfo?.role === "volunteer") {
    return <VolunteerAllRequest></VolunteerAllRequest>
  }

  return <Navigate to="/dashboard" replace />;
};

export default AllRequestRoutes;
