import React, { use } from 'react';
import { FaHandHoldingUsd, FaTint, FaUsers } from 'react-icons/fa';
import { AuthContext } from '../../../Authentication/AuthContex';
import { TbCurrencyTaka } from 'react-icons/tb';


const VolunteerDashBoard = ({ users, allReq, totalFundAmount }) => {
    const { userInfo } = use(AuthContext);


    return (
        <section className="my-12 px-4">
            <div className="text-center">
                <h2 className="text-4xl font-bold mb-4">
                    Welcome back Volunteer, <span className="text-primary">{userInfo?.name}</span>
                </h2>
                <p className="text-gray-600 mb-10" >
                    Real-time insights into donors, funding, and blood donation requests.
                </p>

            </div>

            <h2 className="text-3xl font-extrabold text-center mb-10">
                Statistics
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                <div className="card bg-linear-to-r from-blue-500 to-blue-700 text-white shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300">
                    <div className="card-body flex items-center gap-6">
                        <div className="p-5 rounded-full bg-white/20 text-4xl shadow-lg">
                            <FaUsers />
                        </div>
                        <div>
                            <h3 className="text-4xl font-bold">{users.length}</h3>
                            <p className="opacity-90 text-lg">Total Donors</p>
                        </div>
                    </div>
                </div>

                <div className="card bg-linear-to-r from-green-500 to-emerald-600 text-white shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300">
                    <div className="card-body flex items-center gap-6">
                        <div className="p-5 rounded-full bg-white/20 text-4xl shadow-lg">
                            <FaHandHoldingUsd />
                        </div>
                        <div>
                            <h3 className="text-4xl font-bold flex"><TbCurrencyTaka /> {totalFundAmount}</h3>
                            <p className="opacity-90 text-lg">Total Funding</p>
                        </div>
                    </div>
                </div>

                <div className="card bg-linear-to-r from-red-500 to-rose-600 text-white shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300">
                    <div className="card-body flex items-center gap-6">
                        <div className="p-5 rounded-full bg-white/20 text-4xl shadow-lg">
                            <FaTint />
                        </div>
                        <div>
                            <h3 className="text-4xl font-bold">{allReq.length}</h3>
                            <p className="opacity-90 text-lg">
                                Blood Donation Requests
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default VolunteerDashBoard;