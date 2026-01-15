import React, { use, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { Link } from 'react-router';
import { AuthContext } from '../../../Authentication/AuthContex';
import useAxios from '../../../Hooks/UseAxios';
import Loader from '../../../Shared/Loader';

const DonorDashBoard = () => {
    const { userInfo } = use(AuthContext);
    const [requests, setRequests] = useState([]);
    const axiosInstance = useAxios()
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!userInfo?.email) return;
        setLoading(true);
        axiosInstance
            .get(`/donationReq/${userInfo.email}?limit=3`)
            .then(res => setRequests(res.data))
            .catch(err => console.error(err))
            .finally(() => setLoading(false)); // stop loader in all cases
    }, [userInfo?.email, axiosInstance]);

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

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This donation request will be permanently deleted!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#F91617",
            cancelButtonColor: "#6B7280",
            confirmButtonText: "Yes, delete it!",
        })
            .then(async (result) => {
                if (result.isConfirmed) {
                    const res = await axiosInstance.delete(
                        `/donationReqDetails/${id}`
                    );

                    if (res.data.deletedCount > 0) {
                        setRequests((prev) =>
                            prev.filter((req) => req._id !== id)
                        );
                        Swal.fire({
                            title: "Deleted!",
                            text: "Donation request has been deleted.",
                            icon: "success",
                            confirmButtonColor: "#F91617",
                        });
                    }
                }
            });
    }


    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <Loader />
            </div>
        );
    }


    return (
        <div>
            <div className="text-center">
                <h2 className="text-3xl
                 md:text-5xl font-bold mb-4">
                    Welcome back, <span className="text-primary">{userInfo?.name}</span>
                </h2>
                <p className="text-accent mb-10" >
                    Here’s a quick overview of your recent donation requests and activities.
                </p>

            </div>

            {requests.length > 0 && (
                <div className="overflow-x-auto">
                    <table className="table table-zebra w-full">
                        <thead className="bg-primary text-white">
                            <tr>
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
                                <th>Info</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requests.map((req) => (
                                <tr key={req._id} className="text-start bg-base-200">

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
                                        {req.status === "inprogress" ? (
                                            <div className="flex flex-col gap-1">
                                                <button
                                                    onClick={() => handleDone(req._id)}
                                                    className="btn btn-xs bg-green-500 text-white hover:bg-green-700">
                                                    Done
                                                </button>
                                                <button
                                                    onClick={() => handleCancel(req._id)}
                                                    className="btn btn-xs bg-primary text-white hover:bg-secondary">
                                                    Cancel
                                                </button>
                                            </div>
                                        ) : <p className="text-gray-400 font-bold text-[10px]">unavailable</p>}
                                    </td>
                                    <td>
                                        {req.status === "pending" ? (
                                            <div className="flex flex-col gap-1">
                                                <Link
                                                    to={`/dashboard/donationReqEdit/${req._id}`}
                                                    className="btn btn-xs bg-blue-400 text-white hover:bg-blue-600">
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(req._id)}
                                                    className="btn btn-xs
                                                    text-primary hover:bg-red-500 hover:text-white border-primary">
                                                    Delete
                                                </button>
                                            </div>
                                        ) : <p className="text-gray-400 font-bold text-[10px]">unavailable</p>}
                                    </td>
                                    <td>
                                        <Link
                                            to={`/donationReqDetails/${req._id}`}
                                            className="btn btn-sm text-blue-500 hover:bg-blue-600 hover:text-white border-blue-400"
                                        >
                                            View
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* view all req btn */}
            <div className="flex justify-center mt-10">
                <Link
                    to='/dashboard/my-donation-requests'
                    className="btn btn-primary text-white">
                    View my all request
                </Link>
            </div>

        </div>
    );
};

export default DonorDashBoard;