import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import useAxios from "../Hooks/UseAxios";

const DonationReq = () => {
  const [requests, setRequests] = useState([])
  const axiosInstance = useAxios()

  useEffect(() => {
    axiosInstance.get("/donationReq").then((res) => setRequests(res.data))
  }, [axiosInstance])

  const pendingRequests = requests.filter((req) => req.status === "pending")

  if (pendingRequests.length === 0) {
    return (
      <p className="text-gray-600 text-2xl text-center md:py-30 font-semibold">
        Currently No Pending Donation Request Has Been Found
      </p>
    );
  }

  return (
    <div className="p-6 pt-10">
      <h2 className="text-3xl font-bold mb-2 text-center">
        All <span className="text-primary">Donation</span> Requests
      </h2>
      <p className="text-gray-600 text-center">
        Explore all pending donation requests submitted by our community. You
        can see details such as recipient, blood group, hospital, and request
        status.
      </p>

      <div className="overflow-x-auto py-16">
        <table className="table table-zebra w-full">
          <thead className="bg-primary text-white">
            <tr>
              <th>No</th>
              <th>Recipient Name</th>
              <th>Blood Group</th>
              <th>District</th>
              <th>Upazila</th>
              <th>Date</th>
              <th>Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {pendingRequests.map((req, index) => (
              <tr key={req._id}>
                <td>{index + 1}</td>
                <td>{req.recipientName}</td>
                <td className="font-bold">{req.bloodGroup}</td>
                <td>{req.recipientDistrict}</td>
                <td>{req.recipientUpazila}</td>
                <td>{req.donationDate}</td>
                <td>{req.donationTime}</td>
                <td>
                  <Link
                    to={`/donationReqDetails/${req._id}`}
                    className="btn btn-md bg-blue-500 text-white"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DonationReq;
