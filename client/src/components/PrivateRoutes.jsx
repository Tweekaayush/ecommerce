import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
  const {
    data: {
      user: { _id },
    },
  } = useSelector((state) => state.user);
  return _id ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
