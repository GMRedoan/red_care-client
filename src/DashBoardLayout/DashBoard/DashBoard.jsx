import React, { use } from "react";
import { AuthContext } from "../../Authentication/AuthContex";
import DonorDashBoard from "../DashBoard/Donor/DonorDashBoard";
import AdminDashBoard from "../DashBoard/Admin/AdminDashBoard";
import { useLoaderData } from "react-router";
import VolunteerDashBoard from "../DashBoard/Volunteer/VolunteerDashBoard";

const allReqPromise = fetch('https://assignment-11-server-beta-ashen.vercel.app/donationReq')
    .then(res => res.json())
const DashBoard = () => {
    const { userInfo } = use(AuthContext);
    const users = useLoaderData()
    const allReq = use(allReqPromise)


    return (
        <div className="p-4 pt-14 min-h-screen">
            <title>Dashboard</title>
            {
                userInfo?.role == 'donor' && <DonorDashBoard></DonorDashBoard>
            }
            {
                userInfo?.role == 'admin' && <AdminDashBoard users={users} allReq={allReq}></AdminDashBoard>
            }
            {
                userInfo?.role == 'volunteer' && <VolunteerDashBoard users={users} allReq={allReq}></VolunteerDashBoard>
            }
        </div>
    );
};

export default DashBoard;
