import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Layout from "./components/Layout/Layout";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProductPage from "./pages/ProductPage";
import BrowsePage from "./pages/BrowsePage";
import ProfilePage from "./pages/ProfilePage";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./slices/user.slice";
import PrivateRoutes from "./components/PrivateRoutes";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import UserListPage from "./pages/UserListPage";
import OrderListPage from "./pages/OrderListPage";
import ProductListPage from "./pages/ProductListPage";
import CheckoutPage from "./pages/CheckoutPage";
import SuccessPage from "./pages/SuccessPage";
import FailedPage from "./pages/FailedPage";
import AdminRoute from "./components/AdminRoute";
import OrderPage from "./pages/OrderPage";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, []);

  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/browse" element={<BrowsePage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/success" element={<SuccessPage />} />
            <Route path="/failed" element={<FailedPage />} />
            <Route path="/order/:id" element={<OrderPage />} />
          </Route>
          <Route element={<AdminRoute />}>
            <Route path="/dashboard" element={<AdminDashboardPage />} />
            <Route path="/dashboard/user/list" element={<UserListPage />} />
            <Route path="/dashboard/order/list" element={<OrderListPage />} />
            <Route path="/dashboard/product/list" element={<ProductListPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
