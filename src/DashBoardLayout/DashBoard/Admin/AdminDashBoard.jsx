import React, { use } from 'react';
import { FaHandHoldingUsd, FaTint, FaUsers } from 'react-icons/fa';
import { AuthContext } from '../../../Authentication/AuthContex';
import { TbCurrencyTaka } from 'react-icons/tb';
import {
  PieChart, Pie, Cell, Tooltip, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer
} from 'recharts';

const AdminDashBoard = ({ users, allReq, totalFundAmount }) => {
  const { userInfo } = use(AuthContext);

  const statusData = [
    { name: 'Pending', value: allReq.filter(r => r.status === 'pending').length },
    { name: 'In Progress', value: allReq.filter(r => r.status === 'inprogress').length },
    { name: 'Done', value: allReq.filter(r => r.status === 'done').length },
    { name: 'Canceled', value: allReq.filter(r => r.status === 'Canceled').length },
  ];

  const COLORS = ['#FFD700', '#1E90FF', '#32CD32', '#FF6347'];

  const bloodGroupData = [
    { name: 'A+', value: users.filter(u => u.bloodGroup === 'A+').length },
    { name: 'A-', value: users.filter(u => u.bloodGroup === 'A-').length },
    { name: 'B+', value: users.filter(u => u.bloodGroup === 'B+').length },
    { name: 'B-', value: users.filter(u => u.bloodGroup === 'B-').length },
    { name: 'AB+', value: users.filter(u => u.bloodGroup === 'AB+').length },
    { name: 'AB-', value: users.filter(u => u.bloodGroup === 'AB-').length },
    { name: 'O+', value: users.filter(u => u.bloodGroup === 'O+').length },
    { name: 'O-', value: users.filter(u => u.bloodGroup === 'O-').length },
  ];

  return (
    <section className="my-12 px-4">
       <div className="text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">
          Welcome back Admin, <span className="text-primary">{userInfo?.name}</span>
        </h2>
        <p className="text-accent mb-10">
          Real-time insights into donors, funding, and blood donation requests.
        </p>
      </div>

      {/* Summary Cards */}
      <h2 className="text-3xl font-extrabold text-center mb-10">
        Admin <span className="text-primary">Statistics</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">

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
              <h3 className="text-4xl font-bold flex"><TbCurrencyTaka />{totalFundAmount}</h3>
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
              <p className="opacity-90 text-lg">Blood Donation Requests</p>
            </div>
          </div>
        </div>

      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

        {/* Pie Chart for Request Status */}
        <div className="bg-base-200 p-6 rounded-xl shadow-lg">
          <h3 className="text-2xl font-bold mb-4 text-center">Requests Status</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" />
            </PieChart>
          </ResponsiveContainer>
        </div>

         <div className="bg-base-200 p-6 rounded-xl shadow-lg">
          <h3 className="text-2xl font-bold mb-4 text-center">Donors by Blood Group</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={bloodGroupData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#1E90FF" />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>
    </section>
  );
};

export default AdminDashBoard;
