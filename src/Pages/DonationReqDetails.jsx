import React, { use, useState } from "react";
import { useLoaderData } from "react-router";
import { AuthContext } from "../Authentication/AuthContex";
import useAxios from "../Hooks/UseAxios";
import { ImCross } from "react-icons/im";
import Swal from "sweetalert2";

const DonationReqDetails = () => {
  const singleReq = useLoaderData()
  const [request, setRequest] = useState(singleReq)
  const { userInfo } = use(AuthContext)
  const axiosInstance = useAxios()

  const handleConfirmDonation = async () => {
    const updateDonationReq = {
      donorName: userInfo.name,
      donorEmail: userInfo.email,
      status: "inprogress"
    }

    const res = await axiosInstance.patch(`/donationReqDetails/${request._id}`, updateDonationReq)
    if (res.data.modifiedCount > 0) {
      setRequest({
        ...request, ...updateDonationReq
      })

      Swal.fire({
        title: "Your Donation is in progress!",
        icon: "info",
        confirmButtonColor: "#357BF0",
      });
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-base-100 rounded-2xl shadow-xl my-12">
      <h2 className="text-3xl font-bold text-center mb-8">
        🩸 Donation <span className="text-primary">Request</span> Details
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
        <div className="space-y-2">
          <p className="text-sm text-gray-500">Recipient Name</p>
          <p className="font-semibold">{request.recipientName}</p>
        </div>

        <div className="space-y-2">
          <p className="text-sm text-gray-500">Blood Group</p>
          <span className="inline-block px-4 py-1 rounded-full bg-red-100 text-red-600 font-bold">
            {request.bloodGroup}
          </span>
        </div>

        <div className="space-y-2">
          <p className="text-sm text-gray-500">District</p>
          <p className="font-semibold">{request.recipientDistrict}</p>
        </div>

        <div className="space-y-2">
          <p className="text-sm text-gray-500">Upazila</p>
          <p className="font-semibold">{request.recipientUpazila}</p>
        </div>

        <div className="space-y-2 md:col-span-2">
          <p className="text-sm text-gray-500">Hospital Name</p>
          <p className="font-semibold">{request.hospitalName}</p>
        </div>

        <div className="space-y-2 md:col-span-2">
          <p className="text-sm text-gray-500">Address</p>
          <p className="font-semibold">{request.addressLine}</p>
        </div>

        <div className="space-y-2">
          <p className="text-sm text-gray-500">Donation Date</p>
          <p className="font-semibold">{request.donationDate}</p>
        </div>

        <div className="space-y-2">
          <p className="text-sm text-gray-500">Donation Time</p>
          <p className="font-semibold">{request.donationTime}</p>
        </div>

        <div className="space-y-2">
          <p className="text-sm text-gray-500">Status</p>
          <span
            className={`inline-block px-4 py-1 rounded-full text-sm font-semibold capitalize ${request.status === "pending"
              ? "bg-yellow-100 text-yellow-700"
              : request.status === "inprogress"
                ? "bg-blue-100 text-blue-700"
                : request.status === "done"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
          >
            {request.status}
          </span>
        </div>
      </div>

      <div className="mt-8 p-5 bg-gray-100 rounded-xl">
        <p className="text-sm text-gray-500 mb-1">Request Message</p>
        <p className="font-medium text-gray-800">{request.requestMessage}</p>
      </div>

      <div className="flex justify-center mt-4">
        {request.status !== "pending" ? (
          <button disabled className="btn bg-gray-500 px-20 text-white">
            Donation is not available
          </button>
        ) : (
          <button
            onClick={() => document.getElementById("my_modal_5").showModal()}
            className="btn btn-primary px-20 text-white"
          >
            Donate Now
          </button>
        )}

        <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <div>
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-1">Donor Name</label>
                <input
                  type="text"
                  value={userInfo?.name}
                  readOnly
                  className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-semibold mb-1">Donor Email</label>
                <input
                  type="email"
                  value={userInfo?.email}
                  readOnly
                  className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
                />
              </div>
            </div>

            <div className="modal-action flex justify-center">
              <form method="dialog">
                <button
                  onClick={handleConfirmDonation}
                  className="btn bg-blue-500 text-white px-10"
                >
                  Confirm Donation
                </button>
                <button className="btn btn-primary text-white ml-4">
                  <ImCross />
                </button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default DonationReqDetails;
