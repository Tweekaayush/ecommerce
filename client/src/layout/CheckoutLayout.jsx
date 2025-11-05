import React, { useEffect, useState } from "react";
import CheckoutSteps from "../components/CheckoutSteps";
import {
  CreditCard,
  LoaderCircle,
  NotebookTabs,
  ShoppingCart,
} from "lucide-react";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../features/cart.slice";
import { placeOrder } from "../features/order.slice";
import Skeleton from "../components/Skeleton";

const CheckoutLayout = () => {
  const dispatch = useDispatch();
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const {
    loading: cartLoading,
    data: { cart, total, subTotal, discount, shippingAddress, coupon },
  } = useSelector((state) => state.cart);
  const {
    loading: userLoading,
    data: {
      user: { fullAddress, email },
      coupons,
    },
  } = useSelector((state) => state.user);
  const { loading: orderLoading } = useSelector((state) => state.order);
  const checkoutSteps = [
    {
      name: "Cart",
      icon: <ShoppingCart className="w-5 h-5"/>,
      button: "Continue",
      link: "/checkout",
      func: function () {
        return true;
      },
    },
    {
      name: "Shipping Address",
      button: "Continue",
      icon: <NotebookTabs className="w-5 h-5"/>,
      link: "/checkout/address",
      func: function () {
        if (
          fullAddress.address &&
          fullAddress.postalCode &&
          fullAddress.city &&
          fullAddress.country
        ) {
          dispatch(saveShippingAddress({ ...fullAddress }));
          return true;
        }
        toast.error("Please enter your shipping address");
        return false;
      },
    },
    {
      name: "Payment",
      button: "place order",
      icon: <CreditCard className="w-5 h-5"/>,
      link: "/checkout/payment",
      func: function () {
        const order = {
          products: cart,
          shippingAddress,
          couponCode: coupon?.code || "",
          email,
        };
        dispatch(placeOrder(order));
        return false;
      },
    },
  ];

  const handleNextStep = () => {
    if (step > checkoutSteps?.length) return;
    const res = checkoutSteps[step - 1].func();
    if (res) setStep((p) => p + 1);
  };

  useEffect(() => {
    if (step === 1) {
      navigate("/checkout");
    } else if (step === 2) {
      navigate("/checkout/address");
    } else if (step === 3) {
      navigate("/checkout/payment");
    } else return;
  }, [step]);
  return (
    <section className="min-h-screen">
      <div className="container h-full flex flex-col">
        <CheckoutSteps
          setStep={setStep}
          step={step}
          checkoutSteps={checkoutSteps}
        />
        <div className="grid grid-cols-[1fr] lg:grid-cols-[8fr_4fr] gap-4 mt-20 h-full">
          <Outlet />
          <div className="flex flex-col py-8 px-4 h-fit shadow-card max-w-[400px]">
            <h1 className="heading-1 text-red-500 text-sm md:text-base mb-4">
              cart summary
            </h1>
            <div className="flex justify-between mb-4">
              <h4 className="heading-2 text-sm md:text-base">Subtotal</h4>
              {!cartLoading ? (
                <div className="flex">
                  <span className="text-xs">$</span>
                  <p className="text-sm md:text-base ml-0.5 font-medium">{subTotal}</p>
                </div>
              ) : (
                <Skeleton classname="w-15 h-5" />
              )}
            </div>
            <div className="flex justify-between mb-4">
              <h4 className="heading-2 text-sm md:text-base">Discount</h4>
              {!cartLoading ? (
                <div className="flex">
                  <span className="text-xs">$</span>
                  <p className="text-sm md:text-base ml-0.5 font-medium">{discount}</p>:
                </div>
              ) : (
                <Skeleton classname="w-15 h-5" />
              )}
            </div>
            <div className="flex justify-between mb-4 border-t pt-4 border-dashed">
              <h4 className="heading-2 text-sm md:text-base">Total</h4>
              {!cartLoading ? (
                <div className="flex">
                  <span className="text-xs">$</span>
                  <p className="text-sm md:text-base ml-0.5 font-medium">{total}</p>
                </div>
              ) : (
                <Skeleton classname="w-15 h-5" />
              )}
            </div>

            <button
              className="button-1"
              onClick={handleNextStep}
              disabled={orderLoading || cartLoading || userLoading}
            >
              {orderLoading || cartLoading || userLoading ? (
                <LoaderCircle className="animate-spin mx-auto" />
              ) : (
                checkoutSteps[step - 1]?.button
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CheckoutLayout;
