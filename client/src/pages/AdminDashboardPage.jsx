import {
  DollarSign,
  SquareArrowOutUpRight,
  ShoppingCart,
  ToolCase,
  User,
  PackageSearch,
} from "lucide-react";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ResponsiveContainer,
  BarChart,
  PieChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  Pie,
  Cell,
} from "recharts";
import { getAnalytics } from "../features/admin.slice";
import { useNavigate } from "react-router-dom";
import Skeleton from "../components/Skeleton";

const AdminDashboardPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    loading,
    data: {
      totalRevenue,
      totalSales,
      totalUsers,
      totalProducts,
      revenueChart,
      orderStatus,
    },
  } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(getAnalytics());
    document.title = 'Admin Dashboard'
  }, []);
  return (
    <section className="min-h-screen">
      <div className="container">
        <h1 className="heading-1 text-lg md:text-xl text-red-500 uppercase mb-7">
          Dashboard
        </h1>
        {!loading ? (
          <div className="grid grid-cols-4 gap-4">
            <div className="dashboard-card">
              <div className="flex-1">
                <h1 className="text-green-500 heading-1 mb-2 text-sm md:text-base">
                  Total Revenue
                </h1>
                <div className="flex">
                  <span className="text-xs mt-0.5">$</span>
                  <p className="ml-0.5 font-semibold">{totalRevenue.toFixed(2)}</p>
                </div>
              </div>
              <div className="">
                <DollarSign className="text-green-500 w-5 h-5" />
              </div>
            </div>
            <div
              className="dashboard-card"
              onClick={() => navigate("/dashboard/order/list")}
            >
              <div className="flex-1">
                <h1 className="text-red-500 heading-1 text-sm md:text-base mb-2 font-bold">
                  Orders
                </h1>
                <p>{totalSales}</p>
              </div>
              <div className="">
                <ShoppingCart className="text-red-500 w-5 h-5" />
              </div>
            </div>
            <div
              className="dashboard-card"
              onClick={() => navigate("/dashboard/user/list")}
            >
              <div className="flex-1">
                <h1 className="text-blue-500 heading-1 text-sm md:text-base mb-2 font-bold">
                  Users
                </h1>
                <p>{totalUsers}</p>
              </div>
              <div className="">
                <User className="text-blue-500 w-5 h-5" />
              </div>
            </div>
            <div
              className="dashboard-card"
              onClick={() => navigate("/dashboard/product/list")}
            >
              <div className="flex-1">
                <h1 className="text-yellow-500 heading-1 text-sm md:text-base mb-2 font-bold">
                  Product
                </h1>
                <p>{totalProducts}</p>
              </div>
              <div className="">
                <PackageSearch className="text-yellow-500 w-5 h-5" />
              </div>
            </div>
            <div className="col-span-4 md:col-span-3 shadow-card p-4 rounded-sm hover:shadow-hover cursor-pointer">
              <h1 className="heading-1 text-red-500 text-sm md:text-base">Revenue</h1>
              <p className="body-text mb-4">(last 7 days)</p>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart style={{ fontSize: "14px" }} data={revenueChart}>
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="revenue" fill="magenta" />
                  <Bar dataKey="sales" fill="blue" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="col-span-4 md:col-span-1 shadow-card p-4 rounded-sm hover:shadow-hover cursor-pointer">
              <h1 className="heading-1 text-red-500 text-sm md:text-base">Order Status</h1>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={orderStatus}
                    dataKey="count"
                    nameKey="_id"
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={70}
                  >
                    {orderStatus?.map((e, i) => {
                      let color =
                        e._id === "processing"
                          ? "#e0ac00"
                          : e._id === "cancel"
                          ? "red"
                          : "green";
                      return <Cell key={e._id} fill={color} />;
                    })}
                  </Pie>
                  <Tooltip />
                  <Legend wrapperStyle={{ textTransform: "capitalize" }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div
              onClick={() => navigate("/dashboard/product/create")}
              className="col-span-4 shadow-card hover:shadow-card-hover p-4 cursor-pointer flex gap-4 items-center"
            >
              <h1 className="heading-1 text-sm md:text-base">Create new product</h1>
              <SquareArrowOutUpRight className="w-3.5 h-3.5" />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-4">
            {new Array(4).fill(0).map((_, i) => {
              return <Skeleton key={i} classname="col-span-1 h-25" />;
            })}
            <Skeleton classname="col-span-3 h-96" />
            <Skeleton classname="col-span-1 h-96" />
            <Skeleton classname="h-15 col-span-4" />
          </div>
        )}
      </div>
    </section>
  );
};

export default AdminDashboardPage;
