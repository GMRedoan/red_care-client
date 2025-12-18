import React from "react";
import { FaCalendarAlt, FaDollarSign, FaUser, FaPlus } from "react-icons/fa";
import { TbCurrencyTaka } from "react-icons/tb";
import { useLoaderData } from "react-router";

const Funding = () => {
    const allFunding = useLoaderData();

    return (
        <div className="min-h-screen px-4 py-10 flex flex-col items-center">
            {/* Header Section */}
            <div className="w-full max-w-5xl flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl md:text-4xl font-bold">Funding <span className="text-primary">History</span></h1>
                    <p className="text-gray-500">
                        View all funds contributed by users in 2025
                    </p>
                </div>

                <button className="btn btn-sm md:btn-md btn-primary text-white flex items-center gap-2">
                    <FaPlus />
                    Give Fund
                </button>
            </div>

             <div className="w-full max-w-5xl overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr className="bg-primary text-white">
                            <th>No</th>
                            <th>
                                <div className="flex items-center gap-2">
                                    <FaUser />
                                    Funder Name
                                </div>
                            </th>
                            <th>
                                <div className="flex items-center gap-2">
                                    Amount
                                </div>
                            </th>
                            <th>
                                <div className="flex items-center gap-2">
                                    <FaCalendarAlt />
                                    Date
                                </div>
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {allFunding?.length > 0 ? (
                            allFunding.map((fund, index) => (
                                <tr key={fund._id}>
                                    <td>{index+1}</td>
                                    <td>{fund.funderName}</td>
                                    <td className="font-semibold text-green-500 flex items-center">
                                        <TbCurrencyTaka />{fund.fundAmount}
                                    </td>
                                    <td>{fund.fundingDate}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" className="text-center text-gray-500 py-4">
                                    No funding records found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Funding;
