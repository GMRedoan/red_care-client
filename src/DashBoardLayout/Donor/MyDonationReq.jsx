import React, { use, useEffect, useState } from "react";
import { AuthContext } from "../../Authentication/AuthContex";
import useAxios from "../../Hooks/UseAxios";

const MyDonationReq = () => {
  const { userInfo } = use(AuthContext)
  const axiosInstance = useAxios()

  const [requests, setRequests] = useState([]);
  const [filterStatus, setFilterStatus] = useState("all")

  useEffect(() => {
    axiosInstance.get(`/donationReq/${userInfo.email}`)
          .then((res) => setRequests(res.data));
   }, [userInfo.email, axiosInstance]);

  const filteredRequests =
    filterStatus === "all"
      ? requests
      : requests.filter(r => r.status === filterStatus);

  return (
    <div className="p-6 pt-10">
      <h2 className="text-3xl font-bold mb-4 text-center">
        My <span className="text-primary">Donation</span> Requests
      </h2>

      <div className="flex justify-end mb-3">
        <select
          onChange={(e) => setFilterStatus(e.target.value)}
          className="select select-bordered w-40"
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="inprogress">In Progress</option>
          <option value="done">Done</option>
          <option value="canceled">Canceled</option>
        </select>
      </div>

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
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {filteredRequests.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-4 text-gray-500">
                  No donation requests found.
                </td>
              </tr>
            ) : (
              filteredRequests.map((req, index) => (
                <tr key={req._id}>
                  <td>{index + 1}</td>
                  <td>{req.recipientName}</td>
                  <td className="font-bold">{req.bloodGroup}</td>
                  <td>{req.recipientDistrict}</td>
                  <td>{req.recipientUpazila}</td>
                  <td>{req.hospitalName}</td>
                  <td>{req.donationDate}</td>
                  <td>{req.donationTime}</td>
                  <td className={`font-semibold capitalize ${
              req.status === "pending"
                ? "text-yellow-500"
                : req.status === "inprogress"
                ? "text-blue-500"
                : req.status === "done"
                ? "text-green-500"
                : "text-red-500"
            }`}>{req.status}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyDonationReq;
