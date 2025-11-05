import { LayoutDashboard, Lock, LogOut, ShoppingCart, User } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { logout } from "../features/user.slice";

const AccountLayout = () => {
  const {
    loading,
    data: {
      user: { name, email, role },
    },
  } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [profileLink, setProfileLink] = useState(0);

  const profileComponents = [
    {
      name: "profile",
      link: "/account",
      icon: <User className="w-5 h-5" />,
    },
    {
      name: "privacy",
      link: "/account/privacy",
      icon: <Lock className="w-5 h-5" />,
    },
    {
      name: "address",
      link: "/account/address",
      icon: <Lock className="w-5 h-5" />,
    },
    {
      name: "orders",
      link: "/account/orders",
      icon: <ShoppingCart className="w-5 h-5" />,
    },
  ];

  return (
    <section className="min-h-screen flex justify-center items-center">
      <div className="container grid grid-cols-[1fr] md:grid-cols-[3fr_9fr] gap-4">
        <div className="h-fit">
          <div className="flex items-center py-8  w-full gap-2.5">
            <div className="h-14 w-14 rounded-full overflow-hidden">
              <img
                className="w-full h-full object-fit object-[50%_50%]"
                src="https://res.cloudinary.com/dukfglghw/image/upload/v1760549214/user_pzbqyz.png"
                alt={name}
              />
            </div>
            <div className="flex-1">
              <h1 className="heading-1 text-sm">{name}</h1>
              <p className="body-text text-gray-700">{email}</p>
            </div>
          </div>
          <ul className="w-full h-full flex flex-row md:flex-col items-center overflow-hidden bg-gray-100">
            {profileComponents.map((p, i) => {
              return (
                <li
                  key={p?.name}
                  className="flex justify-center md:justify-start items-center w-full p-4 border-b last-of-type:border-b-0 border-gray-300 text-sm  gap-4 hover:bg-gray-300 cursor-pointer"
                  onClick={() => navigate(p?.link)}
                >
                  {p?.icon}
                  <span className="capitalize hidden md:block">{p?.name}</span>
                </li>
              );
            })}
            {role === "admin" && (
              <li
                className="flex justify-center md:justify-start items-center w-full p-4 border-b last-of-type:border-b-0 border-gray-300 text-sm  gap-4 hover:bg-gray-300 cursor-pointer"
                onClick={() => navigate("/dashboard")}
              >
                <LayoutDashboard className="w-5 h-5" />
                <span className="capitalize hidden md:block">dashboard</span>
              </li>
            )}
            <li
              className="flex justify-center md:justify-start items-center w-full p-4 border-b last-of-type:border-b-0 border-gray-300 text-sm  gap-4 hover:bg-gray-300 cursor-pointer"
              onClick={() => dispatch(logout())}
            >
              <LogOut className="w-5 h-5" />
              <span className="capitalize hidden md:block">logout</span>
            </li>
          </ul>
        </div>
        <div className="p-4 shadow-card h-[550px] rounded-sm">
          <Outlet />
        </div>
      </div>
    </section>
  );
};

export default AccountLayout;
