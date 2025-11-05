import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
// import Cart from "../Cart";
import { Outlet } from "react-router-dom";
import { ToastContainer, Bounce, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  clearUserError,
  clearUserSuccessMessage,
} from "../features/user.slice";
import {
  clearProductError,
  clearProductSuccessMessage,
} from "../features/product.slice";
import {
  clearOrderError,
  clearOrderSuccessMessage,
} from "../features/order.slice";
import {
  clearCartErrors,
  clearCartItems,
  clearCartSuccessMessage,
} from "../features/cart.slice";
import {
  clearAdminError,
  clearAdminSuccessMessage,
} from "../features/admin.slice";

const AppLayout = () => {
  const dispatch = useDispatch();
  const [cartOpen, setCartOpen] = useState(false);
  const { error: userError, successMessage: userSuccessMessage } = useSelector(
    (state) => state.user
  );
  const { error: productError, successMessage: productSuccessMessage } =
    useSelector((state) => state.product);
  const { error: orderError, successMessage: orderSuccessMessage } =
    useSelector((state) => state.order);
  const { error: cartError, successMessage: cartSuccessMessage } = useSelector(
    (state) => state.cart
  );
  const { error: adminError, successMessage: adminSuccessMessage } =
    useSelector((state) => state.admin);

  useEffect(() => {
    if (userError) {
      toast.error(userError);
      dispatch(clearUserError());
    }
    if (productError) {
      toast.error(productError);
      dispatch(clearProductError());
    }
    if (orderError) {
      toast.error(orderError);
      dispatch(clearOrderError());
    }
    if (cartError) {
      toast.error(cartError);
      dispatch(clearCartErrors());
    }
    if (adminError) {
      toast.error(adminError);
      dispatch(clearAdminError());
    }
  }, [userError, productError, orderError, cartError, adminError]);

  useEffect(() => {
    if (userSuccessMessage) {
      toast.success(userSuccessMessage);
      dispatch(clearUserSuccessMessage());
    }
    if (productSuccessMessage) {
      toast.success(productSuccessMessage);
      dispatch(clearProductSuccessMessage());
    }
    if (orderSuccessMessage) {
      toast.success(orderSuccessMessage);
      dispatch(clearOrderSuccessMessage());
    }
    if (cartSuccessMessage) {
      toast.success(cartSuccessMessage);
      dispatch(clearCartSuccessMessage());
    }
    if (adminSuccessMessage) {
      toast.success(adminSuccessMessage);
      dispatch(clearAdminSuccessMessage());
    }
  }, [
    userSuccessMessage,
    productSuccessMessage,
    orderSuccessMessage,
    cartSuccessMessage,
    adminSuccessMessage,
    toast,
  ]);
  return (
    <>
      <Navbar setCartOpen={setCartOpen} cartOpen={cartOpen} />
      <div
        className={`${
          cartOpen ? "block" : "hidden"
        } w-full h-screen fixed top-0 left-0 bg-black z-99 opacity-50`}
        onClick={() => setCartOpen(false)}
      ></div>
      {/* <Cart cartOpen={cartOpen} setCartOpen={setCartOpen} /> */}
      <Outlet />
      <Footer />
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
    </>
  );
};

export default AppLayout;
