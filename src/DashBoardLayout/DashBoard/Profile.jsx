import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Authentication/AuthContex";
import Swal from "sweetalert2";
import axios from "axios";
import { FaEdit } from "react-icons/fa";
import { useLoaderData } from "react-router";
import useAxios from "../../Hooks/UseAxios";

const Profile = () => {
    const { userInfo } = useContext(AuthContext);
    const { districts, upazilas } = useLoaderData();
    const [editable, setEditable] = useState(false);
    const [formData, setFormData] = useState(userInfo || {});
    const [uploading, setUploading] = useState(false);
    const axiosInstance = useAxios();

    useEffect(() => {
        setFormData(userInfo || {});
    }, [userInfo]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageUpload = async (file) => {
        setUploading(true);
        try {
            const formDataUpload = new FormData();
            formDataUpload.append("image", file);
            const res = await axios.post(
                `https://api.imgbb.com/1/upload?&key=a61b7f4958aebb9ca0065ed632a5e5b9`,
                formDataUpload
            );
            const url = res.data.data.display_url;
            handleChange({ target: { name: "photo", value: url } });
        } catch (err) {
            console.log(err);
            Swal.fire({
                title: "Image upload failed",
                icon: "error",
            });
        } finally {
            setUploading(false);
        }
    };

    const handleSave = async () => {
        const { _id, ...updateData } = formData;
        const res = await axiosInstance.patch(`/users/${userInfo._id}`, updateData);
        if (res.data.modifiedCount === 0) {
            return Swal.fire({
                title: "Nothing is changed",
                icon: "info",
                confirmButtonColor: "#357BF0",
            });
        }
        Swal.fire({
            title: "Profile Updated Successfully!",
            icon: "success",
            confirmButtonColor: "#F91617",
        });
        setEditable(false);
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-base-100 animate-gradient-xy py-10">
            <title>Profile</title>
            <div className="max-w-3xl p-8 md:p-12 bg-base-200 rounded-2xl shadow-2xl border border-primary/20 hover:shadow-red-400 transition-all duration-500">

                {/* Header */}
                <div className="flex justify-between items-center mb-8 animate-fadeIn">
                    <h2 className="md:ml-20 text-3xl md:text-4xl font-extrabold text-primary tracking-wide">
                        My Profile
                    </h2>
                    {!editable ? (
                        <button
                            className="btn btn-primary text-white btn-sm hover:scale-105 transform transition-all duration-300"
                            onClick={() => setEditable(true)}
                        >
                            <FaEdit className="mr-2 animate-pulse" /> Edit
                        </button>
                    ) : (
                        <div className="flex gap-2">
                            <button
                                className={`btn bg-blue-500 text-white btn-sm hover:scale-105 transform transition-all duration-300 ${uploading ? "opacity-70 cursor-not-allowed" : ""
                                    }`}
                                onClick={handleSave}
                                disabled={uploading}
                            >
                                {uploading ? "Uploading..." : "Save"}
                            </button>

                            <button
                                className="btn btn-primary btn-sm hover:scale-105 transform transition-all duration-300"
                                onClick={() => {
                                    setFormData(userInfo); 
                                    setEditable(false);    
                                }}
                            >
                                Cancel
                            </button>
                        </div>
                    )}
                </div>

                {/* Form */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">

                    {/* Left Side Form */}
                    <div className="space-y-6 animate-fadeIn delay-100">
                        {/** Name */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-base-300 font-medium">Name</span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name || ""}
                                disabled={!editable}
                                onChange={handleChange}
                                className="input w-full input-bordered bg-base-100 focus:ring-2 focus:ring-red-400 transition-all duration-300"
                            />
                        </div>

                        {/** Email */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-base-300 font-medium">Email</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email || ""}
                                disabled
                                className="input w-full input-bordered bg-base-100 cursor-not-allowed"
                            />
                        </div>

                        {/** Blood Group */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-base-300 font-medium">Blood Group</span>
                            </label>
                            {editable ? (
                                <select
                                    name="bloodGroup"
                                    className="select select-bordered w-full focus:ring-2 focus:ring-red-400 transition-all duration-300"
                                    value={formData.bloodGroup || ""}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="" disabled>
                                        Select Blood Group
                                    </option>
                                    {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => (
                                        <option key={bg} value={bg}>
                                            {bg}
                                        </option>
                                    ))}
                                </select>
                            ) : (
                                <input
                                    type="text"
                                    name="bloodGroup"
                                    value={formData.bloodGroup || ""}
                                    disabled
                                    className="input input-bordered bg-base-100 cursor-not-allowed"
                                />
                            )}
                        </div>

                        {/** District */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-base-300 font-medium">District</span>
                            </label>
                            {editable ? (
                                <select
                                    name="district"
                                    className="select select-bordered w-full focus:ring-2 focus:ring-red-400 transition-all duration-300"
                                    value={formData.district || ""}
                                    onChange={handleChange}
                                >
                                    <option value="" disabled>
                                        Select District
                                    </option>
                                    {districts.map((d) => (
                                        <option key={d.id} value={d.name}>
                                            {d.name}
                                        </option>
                                    ))}
                                </select>
                            ) : (
                                <input
                                    type="text"
                                    name="district"
                                    value={formData.district || ""}
                                    disabled
                                    className="input input-bordered bg-base-100 cursor-not-allowed"
                                />
                            )}
                        </div>

                        {/** Upazila */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-base-300 font-medium">Upazila</span>
                            </label>
                            {editable ? (
                                <select
                                    name="upazila"
                                    className="select select-bordered w-full focus:ring-2 focus:ring-red-400 transition-all duration-300"
                                    value={formData.upazila || ""}
                                    onChange={handleChange}
                                >
                                    <option value="" disabled>
                                        Select Upazila
                                    </option>
                                    {upazilas.map((u) => (
                                        <option key={u.id} value={u.name}>
                                            {u.name}
                                        </option>
                                    ))}
                                </select>
                            ) : (
                                <input
                                    type="text"
                                    name="upazila"
                                    value={formData.upazila || ""}
                                    disabled
                                    className="input input-bordered bg-base-100 cursor-not-allowed"
                                />
                            )}
                        </div>
                    </div>

                    {/* Right Side Image Upload */}
                    <div className="flex flex-col items-center animate-fadeIn delay-200">
                        {!editable ? (
                            <div className="relative group">
                                <div className="w-44 h-44 rounded-full overflow-hidden shadow-lg border-4 border-primary transform transition-all duration-500 group-hover:scale-105">
                                    <img
                                        src={formData.photo}
                                        alt="Profile"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <p className="text-center mt-3 font-semibold text-lg">Profile Picture</p>
                            </div>
                        ) : (
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text font-medium">Upload New Photo</span>
                                </label>
                                <input
                                    type="file"
                                    name="photoFile"
                                    accept="image/*"
                                    className="file-input file-input-bordered w-full hover:border-red-400 transition-all duration-300"
                                    onChange={async (e) => {
                                        const file = e.target.files[0];
                                        if (file) await handleImageUpload(file);
                                    }}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
