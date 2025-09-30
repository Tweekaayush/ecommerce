import { DollarSign, ToolCase, User } from "lucide-react";
import React from "react";
import { useEffect } from "react";
import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
} from "recharts";

const AdminDashboardPage = () => {
  const { totalRevenue, totalSales, users, product } = {
    totalRevenue: 5,
    totalSales: 3,
    users: 3,
    product: 23,
  };
  useEffect(() => {}, []);
  return (
    <section>
      <div className="container">
        <h1>Dashboard</h1>
        <div className="grid grid-cols-4 gap-4">
          <div className="dashboard-card">
            <div className="col-span-2">
              <h1 className="text-green-500 heading-5 mb-2 font-bold">
                Total Revenue
              </h1>
              <p>{totalRevenue}</p>
            </div>
            <div className="col-span-1 flex items-center justify-center">
              <DollarSign className="text-white bg-green-500 w-8 h-8 rounded-full p-1.5" />
            </div>
          </div>
          <div className="dashboard-card">
            <div className="col-span-2">
              <h1 className="text-red-500 heading-5 mb-2 font-bold">
                Total Sales
              </h1>
              <p>{totalSales}</p>
            </div>
            <div className="col-span-1 flex items-center justify-center">
              <DollarSign className="text-white bg-red-500 w-8 h-8 rounded-full p-1.5" />
            </div>
          </div>
          <div className="dashboard-card">
            <div className="col-span-2">
              <h1 className="text-blue-500 heading-5 mb-2 font-bold">Users</h1>
              <p>{users}</p>
            </div>
            <div className="col-span-1 flex items-center justify-center">
              <User className="text-white bg-blue-500 w-8 h-8 rounded-full p-1.5" />
            </div>
          </div>
          <div className="dashboard-card">
            <div className="col-span-2">
              <h1 className="text-yellow-500 heading-5 mb-2 font-bold">
                Product
              </h1>
              <p>{product}</p>
            </div>
            <div className="col-span-1 flex items-center justify-center">
              <DollarSign className="text-white bg-yellow-500 w-8 h-8 rounded-full p-1.5" />
            </div>
          </div>
          <div className="col-span-3 shadow-lg p-4 rounded-sm">
            <h1 className="heading-1">Revenue</h1>
            <p className="body-text mb-4">(last 7 days)</p>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart style={{ fontSize: "14px" }}>
                <XAxis dataKey="_id" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="revenue" fill="purple" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminDashboardPage;
