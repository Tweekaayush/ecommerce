import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import BrowsePage from "./pages/BrowsePage";
import ProductPage from "./pages/ProductPage";
import PrivateRoute from "./routes/PrivateRoute";
import AdminRoute from "./routes/AdminRoute";
import NotFoundPage from "./pages/NotFoundPage";
import SuccessPage from "./pages/SuccessPage";
import FailedPage from "./pages/FailedPage";
import OrderPage from "./pages/OrderPage";
import WishlistPage from "./pages/WishlistPage";
import AccountLayout from "./layout/AccountLayout";
import UpdateAddressPage from "./pages/UpdateAddressPage";
import ProfilePage from "./pages/ProfilePage";
import UpdateProfilePage from "./pages/UpdateProfilePage";
import MyOrdersPage from "./pages/MyOrdersPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import UserListPage from "./pages/UserListPage";
import OrderListPage from "./pages/OrderListPage";
import ProductListPage from "./pages/ProductListPage";

const App = () => {
  return (
    <Suspense fallback={<></>}>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/browse" element={<BrowsePage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/password/forget" element={<ForgotPasswordPage />} />
          <Route path="/password/reset" element={<ResetPasswordPage />} />
          <Route element={<PrivateRoute />}>
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/order/:id" element={<OrderPage />} />
            <Route path="/success/:sessionId" element={<SuccessPage />} />
            <Route path="/failed" element={<FailedPage />} />
            <Route element={<AccountLayout />}>
              <Route path="/account/profile" element={<ProfilePage />} />
              <Route path="/account/privacy" element={<UpdateProfilePage />} />
              <Route path="/account/address" element={<UpdateAddressPage />} />
              <Route path="/account/orders" element={<MyOrdersPage />} />
            </Route>
          </Route>
          <Route element={<AdminRoute />}>
            <Route path="/dashboard" element={<AdminDashboardPage />} />
            <Route path="/dashboard/user/list" element={<UserListPage />} />
            <Route path="/dashboard/order/list" element={<OrderListPage />} />
            <Route
              path="/dashboard/product/list"
              element={<ProductListPage />}
            />
          </Route>
          <Route path="/*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;
