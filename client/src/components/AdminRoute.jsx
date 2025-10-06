import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const AdminRoute = () => {
  const location = useLocation();
  const {
    data: {
      user: { _id, role },
    },
  } = useSelector((state) => state.user);

  return _id && role === "admin" ? (
    <Outlet />
  ) : (
    <Navigate
      to="/"
      replace={true}
      state={{ previousURL: location.pathname }}
    />
  );
};

export default AdminRoute;
