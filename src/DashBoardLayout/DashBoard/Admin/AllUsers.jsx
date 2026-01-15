import React, { use, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useLoaderData } from "react-router";
import useAxios from "../../../Hooks/UseAxios";
import Swal from "sweetalert2";
import { AuthContext } from "../../../Authentication/AuthContex";

const AllUsers = () => {
    const allUsers = useLoaderData()
    const [users, setUsers] = useState(allUsers)
    const axiosInstance = useAxios()
    const { userInfo } = use(AuthContext)
    const [filterStatus, setFilterStatus] = useState("all")

    const filteredUsers =
        filterStatus === "all"
            ? users
            : users.filter((user) => user.status === filterStatus)

    const handleBlock = async (id) => {
        if (userInfo?.email === users.find(u => u._id === id)?.email) {
            return Swal.fire({
                title: "Blocking is not possible",
                text: "You cannot block your own account.",
                icon: "warning",
            })
        }
        if (users.find(u => u._id === id)?.role === 'admin') {
            return Swal.fire({
                title: "Blocking is not Allowed",
                text: "You cannot block another admin.",
                icon: "error",
                confirmButtonColor: "#F91617",
            })
        }
        const updateUser = {
            status: 'blocked'
        }
        const res = await axiosInstance.patch(`/users/${id}`, updateUser)
        if (res.data.modifiedCount > 0) {
            setUsers((OldUsers) =>
                OldUsers.map((user) =>
                    user._id === id ? { ...user, status: "blocked" } : user
                )
            )
            Swal.fire({
                title: "User Blocked Successfully!",
                icon: "success",
                confirmButtonColor: "#F91617",
            });
        }
    }

    const handleUnblock = async (id) => {
        const updateUser = {
            status: 'active'
        }
        const res = await axiosInstance.patch(`/users/${id}`, updateUser)
        if (res.data.modifiedCount > 0) {
            setUsers((OldUsers) =>
                OldUsers.map((user) =>
                    user._id === id ? { ...user, status: "active" } : user
                )
            )
            Swal.fire({
                title: "User is Unblocked",
                icon: "success",
                confirmButtonColor: "#F91617",
            });
        }
    }

    const handleVolunteer = async (id) => {
        const updateUser = {
            role: 'volunteer'
        }
        const res = await axiosInstance.patch(`/users/${id}`, updateUser)
        if (res.data.modifiedCount > 0) {
            setUsers((OldUsers) =>
                OldUsers.map((user) =>
                    user._id === id ? { ...user, role: 'volunteer' } : user
                )
            )
            Swal.fire({
                title: "Now this user is a Volunteer",
                icon: "success",
                confirmButtonColor: "#F91617",
            });
        }
    }

    const handleAdmin = async (id) => {
        const updateUser = {
            role: 'admin'
        }
        const res = await axiosInstance.patch(`/users/${id}`, updateUser)
        if (res.data.modifiedCount > 0) {
            setUsers((OldUsers) =>
                OldUsers.map((user) =>
                    user._id === id ? { ...user, role: 'admin' } : user
                )
            )
            Swal.fire({
                title: "Now this user is an Admin",
                icon: "success",
                confirmButtonColor: "#F91617",
            });
        }
    }



    return (
        <section className="md:px-30 p-4 pt-14 min-h-screen">
            <title>Users</title>
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <div className="pb-8">
                    <h2 className="text-4xl font-bold pb-2">
                        Users <span className="text-primary">Overview</span>
                    </h2>
                    <p className="text-accent">A complete list of platform users with management controls.</p>
                </div>
                <select
                    className="select select-bordered w-44"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                >
                    <option value="all">All</option>
                    <option value="active">Active</option>
                    <option value="blocked">Blocked</option>
                </select>
            </div>

            <div className="overflow-x-auto bg-base-200 rounded-xl shadow-lg">
                <table className="table w-full">
                    <thead className="bg-primary text-white">
                        <tr>
                            <th>No</th>
                            <th>User</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredUsers.map((user, index) => (
                            <tr key={user._id} className="hover">
                                <td>{index+1
                                }</td>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                                <img
                                                    src={user?.photo}
                                                    alt="avatar"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <p className="font-semibold">{user?.name}</p>
                                        </div>
                                    </div>
                                </td>

                                <td className="text-sm text-blue-500">{user?.email}</td>

                                <td>
                                    <span
                                        className={`badge capitalize font-semibold
                                               ${user?.role === "admin"
                                                ? "bg-primary text-white"
                                                : user?.role === "volunteer"
                                                    ? "bg-yellow-400 text-black"
                                                    : "bg-blue-500 text-white"
                                            }`}
                                    >
                                        {user?.role}
                                    </span>
                                </td>
                                <td>
                                    <span
                                        className={`badge font-semibold text-white
                                             ${user.status === "active"
                                                ? "badge-success"
                                                : "badge-error"
                                            }`}
                                    >
                                        {user?.status}
                                    </span>
                                </td>

                                <td className="text-center">
                                    <div className="dropdown dropdown-left">
                                        <label tabIndex={0} className="btn btn-ghost btn-sm">
                                            <BsThreeDotsVertical className="text-lg" />
                                        </label>

                                        <ul
                                            tabIndex={0}
                                            className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-42"
                                        >
                                            {user?.status === "active" ? (
                                                <li>
                                                    <button
                                                        onClick={() => handleBlock(user._id)}
                                                        className="btn btn-sm btn-primary text-white">
                                                        Block User
                                                    </button>
                                                </li>
                                            ) : (
                                                <li>
                                                    <button
                                                        onClick={() => handleUnblock(user._id)}
                                                        className="btn btn-sm bg-green-500 text-white">
                                                        Unblock User
                                                    </button>
                                                </li>
                                            )}

                                            {user?.role === "donor" && (
                                                <li>
                                                    <button
                                                        onClick={() => handleVolunteer(user._id)}
                                                        className="btn btn-sm bg-blue-500 text-white mt-2">
                                                        Make Volunteer
                                                    </button>
                                                </li>
                                            )}

                                            {user?.role !== "admin" && (
                                                <li>
                                                    <button
                                                        onClick={() => handleAdmin(user._id)}
                                                        className="btn btn-sm bg-purple-500 text-white mt-2">
                                                        Make Admin
                                                    </button>
                                                </li>
                                            )}
                                        </ul>
                                    </div>
                                </td>
                            </tr>
                        ))}

                        {filteredUsers.length === 0 && (
                            <tr>
                                <td colSpan="5" className="text-center py-10 text-accent text-xl">
                                    No users found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default AllUsers;
