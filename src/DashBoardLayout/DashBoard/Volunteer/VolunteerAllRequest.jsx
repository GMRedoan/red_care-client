import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxios from "../../../Hooks/UseAxios";

const VolunteerAllRequest = () => {
  const axiosInstance = useAxios()

  const [requests, setRequests] = useState([]);
  const [filterStatus, setFilterStatus] = useState("all")

  useEffect(() => {
    axiosInstance.get('/donationReq')
      .then((res) => setRequests(res.data));
  }, [axiosInstance]);

  const filteredRequests =
    filterStatus === "all"
      ? requests
      : requests.filter(r => r.status === filterStatus);

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

  return (
    <div className="p-6 pt-10">
      <h2 className="text-3xl font-bold mb-4 text-center">
        All <span className="text-primary">Donation</span> Requests
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
          <option value="Canceled">Canceled</option>
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
              <th>Donor info</th>
              <th>Status</th>
              <th>Action</th>
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

                  <td className={`font-semibold capitalize ${req.status === "pending"
                    ? "text-yellow-500"
                    : req.status === "inprogress"
                      ? "text-blue-500"
                      : req.status === "done"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}>{req.status}</td>

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
                    ): <p className="text-gray-400 font-bold text-[10px]">unavailable</p>}
                  </td>
                 </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VolunteerAllRequest;
 