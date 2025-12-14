import React, { use, useEffect, useState } from "react";
import { AuthContext } from "../../Authentication/AuthContex";
import useAxios from "../../Hooks/UseAxios";
import Swal from "sweetalert2";
import { Link } from "react-router";

const DashBoard = () => {
    const { userInfo } = use(AuthContext);
    const [requests, setRequests] = useState([]);
    const axiosInstance = useAxios()

    useEffect(() => {
        axiosInstance.get(`/donationReq/${userInfo.email}?limit=3`)
            .then(res => setRequests(res.data));
    }, [userInfo.email, axiosInstance])

    const handleDone = async (id) => {
        const updateStatus = { status: "done" };

        const res = await axiosInstance.patch(`/donationReqDetails/${id}`,
            updateStatus)

        if (res.data.modifiedCount > 0) {
            setRequests((Requests) =>
                Requests.map((req) =>
                    req._id === id
                        ? { ...req, status: "done" }
                        : req
                )
            );
            Swal.fire({
                title: "Your Donation is Done!",
                icon: "success",
                confirmButtonColor: "#357BF0",
            });
        }
    };

    const handleCancel = async (id) => {
        const updateStatus = { status: "Canceled" };

        const res = await axiosInstance.patch(`/donationReqDetails/${id}`,
            updateStatus)

        if (res.data.modifiedCount > 0) {
            setRequests((Requests) =>
                Requests.map((req) =>
                    req._id === id
                        ? { ...req, status: "Canceled" }
                        : req
                )
            );
            Swal.fire({
                title: "Your Donation is Canceled!",
                icon: "error",
                confirmButtonColor: "#F91617",
            });
        }

    }

    const handleDelete = () => {

    }

    return (
        <div className="p-4 pt-14 min-h-screen">
            <h2 className="text-3xl font-bold mb-4">
                Welcome back, <span className="text-primary">{userInfo.name}</span>
            </h2>
            <p className="text-gray-600 mb-10" >
                Here’s a quick overview of your recent donation requests and activities.
            </p>

            {requests.length > 0 && (
                <div className="overflow-x-auto">
                    <table className="table table-zebra w-full">
                        <thead className="bg-primary text-white">
                            <tr>
                                <th>No</th>
                                <th>Recipient Name</th>
                                <th>Blood Group</th>
                                <th>District</th>
                                <th>Upazila</th>
                                <th>Hospital</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Donor Info</th>
                                <th>Status</th>
                                <th>Action</th>
                                <th>Manage</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requests.map((req, index) => (
                                <tr key={req._id} className="text-start">
                                    <td>{index + 1}</td>

                                    <td>{req.recipientName}</td>

                                    <td className="font-bold">{req.bloodGroup}</td>

                                    <td>{req.recipientDistrict}</td>

                                    <td>{req.recipientUpazila}</td>

                                    <td>{req.hospitalName}</td>

                                    <td>{req.donationDate}</td>

                                    <td>{req.donationTime}</td>

                                    <td>
                                        {req.donorName ? (
                                            <div>
                                                <p className="font-semibold">{req.donorName}</p>
                                                <p className="text-sm text-blue-500">{req.donorEmail}</p>
                                            </div>
                                        ) : (
                                            <span className="text-gray-400">Not Assigned</span>
                                        )}
                                    </td>

                                    <td
                                        className={`font-semibold capitalize
                                          ${req.status === "pending"
                                                ? "text-yellow-500"
                                                : req.status === "inprogress"
                                                    ? "text-blue-500"
                                                    : req.status === "done"
                                                        ? "text-green-500"
                                                        : "text-red-500"
                                            }`}
                                    >
                                        {req.status}
                                    </td>

                                    <td>
                                        {req.status === "inprogress" && (
                                            <div className="flex flex-col gap-1">
                                                <button
                                                    onClick={() => handleDone(req._id)}
                                                    className="btn btn-xs bg-green-500 text-white">
                                                    Done
                                                </button>
                                                <button
                                                    onClick={() => handleCancel(req._id)}
                                                    className="btn btn-xs bg-red-500 text-white">
                                                    Cancel
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                    <td>
                                        {req.status === "pending" && (
                                            <div className="flex flex-col gap-1">
                                                <Link
                                                to={`/dashboard/donationReqEdit/${req._id}`}
                                                    className="btn btn-xs bg-blue-500 text-white">
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(req._id)}
                                                    className="btn btn-xs hover:bg-red-500 hover:text-white">
                                                    Delete
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default DashBoard;
