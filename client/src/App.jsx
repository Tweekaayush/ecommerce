import React, { useEffect, lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./slices/user.slice";
import PrivateRoutes from "./components/PrivateRoutes";
import AdminRoute from "./components/AdminRoute";
import Layout from "./components/Layout/Layout";
import Loader from "./components/Loader";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
const HomePage = lazy(() => import("./pages/HomePage"));
const BrowsePage = lazy(() => import("./pages/BrowsePage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const SignUpPage = lazy(() => import("./pages/SignUpPage"));
const ProductPage = lazy(() => import("./pages/ProductPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const AdminDashboardPage = lazy(() => import("./pages/AdminDashboardPage"));
const UserListPage = lazy(() => import("./pages/UserListPage"));
const OrderListPage = lazy(() => import("./pages/OrderListPage"));
const ProductListPage = lazy(() => import("./pages/ProductListPage"));
const CheckoutPage = lazy(() => import("./pages/CheckoutPage"));
const SuccessPage = lazy(() => import("./pages/SuccessPage"));
const FailedPage = lazy(() => import("./pages/FailedPage"));
const OrderPage = lazy(() => import("./pages/OrderPage"));
const WishlistPage = lazy(() => import("./pages/WishlistPage"));
const UpdateProductPage = lazy(() => import("./pages/UpdateProductPage"));
const CreateProductPage = lazy(() => import("./pages/CreateProductPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, []);

  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/browse" element={<BrowsePage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/password/forget" element={<ForgotPasswordPage />} />
            <Route path="/password/reset" element={<ResetPasswordPage />} />
            <Route element={<PrivateRoutes />}>
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/success/:sessionId" element={<SuccessPage />} />
              <Route path="/failed" element={<FailedPage />} />
              <Route path="/order/:id" element={<OrderPage />} />
              <Route path="/wishlist" element={<WishlistPage />} />
            </Route>
            <Route element={<AdminRoute />}>
              <Route path="/dashboard" element={<AdminDashboardPage />} />
              <Route path="/dashboard/user/list" element={<UserListPage />} />
              <Route path="/dashboard/order/list" element={<OrderListPage />} />
              <Route
                path="/dashboard/product/list"
                element={<ProductListPage />}
              />
              <Route
                path="/dashboard/product/update/:id"
                element={<UpdateProductPage />}
              />
              <Route
                path="/dashboard/product/create"
                element={<CreateProductPage />}
              />
            </Route>
            <Route path="/*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
