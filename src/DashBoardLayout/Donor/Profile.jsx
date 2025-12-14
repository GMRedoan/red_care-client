import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../../Authentication/AuthContex';
import Swal from 'sweetalert2';
import axios from 'axios';
import { FaEdit } from 'react-icons/fa';
import { useLoaderData } from 'react-router';
import useAxios from '../../Hooks/UseAxios';

const Profile = () => {
    const { userInfo } = use(AuthContext);
    const { districts, upazilas } = useLoaderData()
    const [editable, setEditable] = useState(false);
    const [formData, setFormData] = useState(userInfo || {});
    const [uploading, setUploading] = useState(false);
    const axiosInstance = useAxios()

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
        }
         catch (err) {
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
        const { _id, ...updateData } = formData
        const res = await axiosInstance.patch(`/users/${userInfo._id}`, updateData)
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
        setEditable(false);
    };
    return (
        <div className='flex justify-center items-center min-h-screen'>
            <div className="max-w-3xl p-6 px-10 bg-white rounded-xl shadow-lg ">

                <div className="flex justify-between items-center mb-6">
                    <h2 className="md:ml-20 text-2xl font-bold text-primary">My Profile</h2>
                    {!editable ? (
                        <button className="btn btn-primary text-white btn-sm" onClick={() => setEditable(true)}>
                            <FaEdit></FaEdit> Edit
                        </button>
                    ) : (
                        <button className="btn bg-blue-400 text-white btn-sm" onClick={handleSave} disabled={uploading}>
                            {uploading ? "Uploading..." : "Save"}
                        </button>
                    )}
                </div>

                {/* Form */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-15">

                    <div className="space-y-5">
                        <div className="form-control">
                            <label className="label"><span className="label-text">Name</span></label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name || ''}
                                disabled={!editable}
                                className="input w-full input-bordered"
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-control">
                            <label className="label"><span className="label-text">Email</span></label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email || ''}
                                disabled
                                className="input input-bordered bg-gray-100 cursor-not-allowed"
                            />
                        </div>
                        {/* blood group */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Blood Group</span>
                            </label>

                            {editable ? (
                                <select
                                    name="bloodGroup"
                                    className="select select-bordered w-full"
                                    value={formData.bloodGroup || ''}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="" disabled>Select Blood Group</option>
                                    <option value="A+">A+</option>
                                    <option value="A-">A-</option>
                                    <option value="B+">B+</option>
                                    <option value="B-">B-</option>
                                    <option value="AB+">AB+</option>
                                    <option value="AB-">AB-</option>
                                    <option value="O+">O+</option>
                                    <option value="O-">O-</option>
                                </select>
                            ) : (
                                <input
                                    type="text"
                                    name="bloodGroup"
                                    value={formData.bloodGroup || ''}
                                    disabled
                                    className="input input-bordered bg-gray-100 cursor-not-allowed"
                                />
                            )}
                        </div>
                        {/* district */}
                        <div className="form-control">
                            <label className="label"><span className="label-text">District</span></label>

                            {editable ? (
                                <select
                                    name="district"
                                    className="select select-bordered w-full"
                                    value={formData.district || ''}
                                    onChange={handleChange}
                                >
                                    <option value="" disabled>Select District</option>
                                    {districts.map(d => (
                                        <option key={d.id} value={d.name}>{d.name}</option>
                                    ))}
                                </select>
                            ) : (
                                <input
                                    type="text"
                                    name="district"
                                    value={formData.district || ''}
                                    disabled
                                    className="input input-bordered bg-gray-100 cursor-not-allowed"
                                />
                            )}
                        </div>
                        {/* upazila */}
                        <div className="form-control">
                            <label className="label"><span className="label-text">Upazila</span></label>

                            {editable ? (
                                <select
                                    name="upazila"
                                    className="select select-bordered w-full"
                                    value={formData.upazila || ''}
                                    onChange={handleChange}
                                >
                                    <option value="" disabled>Select Upazila</option>
                                    {upazilas.map(u => (
                                        <option key={u.id} value={u.name}>{u.name}</option>
                                    ))}
                                </select>
                            ) : (
                                <input
                                    type="text"
                                    name="upazila"
                                    value={formData.upazila || ''}
                                    disabled
                                    className="input input-bordered bg-gray-100 cursor-not-allowed"
                                />
                            )}
                        </div>
                    </div>

                    <div className='order-first md:order-last'>
                        {!editable && (
                            <div>
                                <div className="md:mt-23 flex justify-center">
                                    <div className="w-40 h-40 rounded-full overflow-hidden shadow border-2 border-primary">
                                        <img
                                            src={formData.photo}
                                            alt="Profile"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </div>
                                <p className='text-center mt-2 font-semibold'>Profile Picture</p>
                            </div>
                        )}

                        {editable && (
                            <div className="form-control mt-5">
                                <label className="label"><span className="label-text">Upload New Photo</span></label>
                                <input
                                    type="file"
                                    name="photoFile"
                                    accept="image/*"
                                    className="file-input file-input-bordered w-full"
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
