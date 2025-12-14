import React, { use } from 'react';
import { useForm } from 'react-hook-form';
import { useLoaderData } from 'react-router';
import { AuthContext } from '../../Authentication/AuthContex';
import Swal from 'sweetalert2';
import useAxios from '../../Hooks/UseAxios';

const districtsPromise = fetch('/district.json').then(res => res.json())
const upazilsPromise = fetch('/upazila.json').then(res => res.json())

const DonationReqEdit = () => {
    const info = useLoaderData()
    const { userInfo } = use(AuthContext)
    const districts = use(districtsPromise)
    const upazilas = use(upazilsPromise)
    const axiosInstance = useAxios()

    const {
        register,
        handleSubmit
    } = useForm()

    const onSubmit = async (data) => {

        const res = await axiosInstance.patch(`/donationReqDetails/${info._id}`,
            data)

        if (res.data.modifiedCount === 0) {
            return Swal.fire({
                title: "Nothing is changed",
                icon: "info",
                confirmButtonColor: "#357BF0",
            })
        }
        Swal.fire({
            title: "Profile Updated Successfully!",
            icon: "success",
            confirmButtonColor: "#F91617",
        });
    };
    return (
        <div className="my-10 max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold mb-8 text-center">
                Edit Your <span className="text-primary">Donation</span> Request
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <div>
                    <label className="font-semibold mb-1 block">Requester Name</label>
                    <input
                        type="text"
                        readOnly
                        defaultValue={userInfo?.name}
                        {...register("requesterName")}
                        className="input input-bordered w-full bg-gray-100"
                    />
                </div>

                <div>
                    <label className="font-semibold mb-1 block">Requester Email</label>
                    <input
                        type="email"
                        readOnly
                        defaultValue={userInfo?.email}
                        {...register("requesterEmail")}
                        className="input input-bordered w-full bg-gray-100"
                    />
                </div>

                <div className="md:col-span-2">
                    <label className="font-semibold mb-1 block">Recipient Name</label>
                    <input
                        type="text"
                        defaultValue={info.recipientName}
                        {...register("recipientName", { required: true })}
                        className="input input-bordered w-full"
                    />
                </div>

                <div>
                    <label className="font-semibold mb-1 block">Recipient District</label>
                    <select
                        defaultValue={info.recipientDistrict}
                        {...register("recipientDistrict", { required: true })}
                        className="select select-bordered w-full"
                    >
                        <option value="" disabled>Select District</option>
                        {districts.map((d) => (
                            <option key={d.id} value={d.name}>
                                {d.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="font-semibold mb-1 block">Recipient Upazila</label>
                    <select
                        defaultValue={info.recipientUpazila}
                        {...register("recipientUpazila", { required: true })}
                        className="select select-bordered w-full"
                    >
                        <option value="" disabled>Select Upazila</option>
                        {upazilas.map((u) => (
                            <option key={u.id} value={u.name}>
                                {u.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="md:col-span-2">
                    <label className="font-semibold mb-1 block">Hospital Name</label>
                    <input
                        type="text"
                        defaultValue={info.hospitalName}
                        {...register("hospitalName", { required: true })}
                        className="input input-bordered w-full"
                    />
                </div>

                <div className="md:col-span-2">
                    <label className="font-semibold mb-1 block">Full Address</label>
                    <input
                        type="text"
                        defaultValue={info.addressLine}
                        {...register("addressLine", { required: true })}
                        className="input input-bordered w-full"
                    />
                </div>

                <div>
                    <label className="font-semibold mb-1 block">Blood Group</label>
                    <select
                        defaultValue={info.bloodGroup}
                        {...register("bloodGroup", { required: true })}
                        className="select select-bordered w-full"
                    >
                        <option value="" disabled>Select blood group</option>
                        <option>A+</option><option>A-</option>
                        <option>B+</option><option>B-</option>
                        <option>AB+</option><option>AB-</option>
                        <option>O+</option><option>O-</option>
                    </select>
                </div>

                <div>
                    <label className="font-semibold mb-1 block">Donation Date</label>
                    <input
                        type="date"
                        defaultValue={info.donationDate}
                        {...register("donationDate", { required: true })}
                        className="input input-bordered w-full"
                    />
                </div>

                <div>
                    <label className="font-semibold mb-1 block">Donation Time</label>
                    <input
                        type="time"
                        defaultValue={info.donationTime}
                        {...register("donationTime", { required: true })}
                        className="input input-bordered w-full"
                    />
                </div>

                <div className="md:col-span-2">
                    <label className="font-semibold mb-1 block">Request Message</label>
                    <textarea
                        rows="4"
                        defaultValue={info.requestMessage}
                        {...register("requestMessage", { required: true })}
                        className="textarea textarea-bordered w-full"
                    ></textarea>
                </div>

                <div className="md:col-span-2 flex justify-center">
                    <button className='btn btn-primary text-white'>
                        Update Donation Request
                    </button>
                </div>
            </form>
        </div>
    );
};

export default DonationReqEdit;