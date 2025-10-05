import React, { useEffect, useState, useCallback, useRef } from "react";
import CheckoutSteps from "../components/CheckoutSteps";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress, setCoupon } from "../slices/cart.slice";
import img from "/assets/cart/empty-cart.png";
import { ShoppingCart, NotebookTabs, CreditCard } from "lucide-react";
import CheckoutCart from "../components/CheckoutCart";
import Payment from "../components/Payment";
import ShippingAddress from "../components/ShippingAddress";
import { placeOrder } from "../slices/order.slice";
import { getCoupons } from "../slices/user.slice";

const CheckoutPage = () => {
  const {
    data: { cart, total, subTotal, discount, shippingAddress, coupon },
  } = useSelector((state) => state.cart);
  const {
    loading: userLoading,
    data: {
      user: { fullAddress, email },
      coupons,
    },
  } = useSelector((state) => state.user);
  const [step, setStep] = useState(1);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const ref = useRef(0);

  const checkoutSteps = [
    {
      name: "Cart",
      component: <CheckoutCart />,
      button: "Continue",
      func: function () {
        return true;
      },
      icon: <ShoppingCart />,
    },
    {
      name: "Shipping Address",
      component: <ShippingAddress />,
      button: "Continue",
      func: function () {
        if (fullAddress) {
          dispatch(saveShippingAddress({ ...fullAddress }));
          return true;
        }
        toast.error("Please enter your shipping address");
        return false;
      },
      icon: <NotebookTabs />,
    },
    {
      name: "Payment",
      component: <Payment open={open} setOpen={setOpen} />,
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
      button: "place order",
      icon: <CreditCard />,
    },
  ];

  const ActiveComponent = useCallback(() => {
    return checkoutSteps[step - 1]?.component;
  }, [step]);

  const handleNextStep = () => {
    if (step > checkoutSteps.length) return;
    const res = checkoutSteps[step - 1].func();
    if (res) setStep((p) => p + 1);
  };

  const handleClickOutside = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.title = checkoutSteps[step - 1].name;
  }, [step]);

  useEffect(() => {
    dispatch(getCoupons());
    window.addEventListener("click", handleClickOutside, true);
    return () => window.removeEventListener("click", handleClickOutside, true);
  }, []);

  return cart?.length !== 0 ? (
    <section className="min-h-screen">
      <div
        className={`${
          open ? "flex" : "hidden"
        } absolute top-0 left-0 w-full h-full bg-overlay justify-center items-center z-[50]`}
      >
        <div
          ref={ref}
          className="w-[400px] h-fit shadow-card bg-white flex flex-col p-4 rounded-lg"
        >
          <h1 className="heading-1 mb-8">My Coupons</h1>
          {coupons.length ? (
            <div className="flex flex-col">
              {coupons.map((c, i) => {
                return (
                  <div
                    className="rounded-lg overflow-hidden bg-gray-100 shadow-card flex h-25"
                    key={c.expirationDate}
                  >
                    <div className="bg-red-500 text-white p-2 text-vertical uppercase h-f">
                      {c.discountPercentage}% off
                    </div>
                    <div className="flex flex-col flex-1 p-2">
                      <div className="flex border-b border-dashed pb-2">
                        <div className="flex flex-col flex-1">
                          <h1 className="font-extrabold">{c.code}</h1>
                          <p className="body-text font-bold text-green-500">
                            Save ${(subTotal * c.discountPercentage) / 100} on
                            the order!
                          </p>
                        </div>
                        <button
                          className="heading-1 cursor-pointer"
                          onClick={() => [
                            dispatch(setCoupon(c)),
                            setOpen(false),
                          ]}
                        >
                          Apply
                        </button>
                      </div>
                      <div className="pt-1">
                        <p className="text-xs">
                          Expires on: {c.expirationDate.split("T")[0]}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex-flex-col p-4 text-center text-gray-500">
              You have no coupons.
            </div>
          )}
        </div>
      </div>
      <div className="container h-full flex flex-col">
        <CheckoutSteps
          stepNo={step}
          checkoutSteps={checkoutSteps}
          setStep={setStep}
        />
        <div className="grid grid-cols-[1fr] md:grid-cols-[8fr_4fr] gap-4 mt-20 h-full">
          <ActiveComponent />

          <div className="flex flex-col py-8 px-4 h-fit shadow-card max-w-[400px]">
            <h1 className="heading-1 mb-4">cart summary</h1>
            <div className="flex justify-between mb-4">
              <h4 className="heading-6">Subtotal</h4>
              <p className="text-sm capitalize">${subTotal}</p>
            </div>
            <div className="flex justify-between mb-4">
              <h4 className="heading-6">Discount</h4>
              <p className="text-sm capitalize">${discount}</p>
            </div>
            <div className="flex justify-between mb-4 border-t pt-4 border-dashed">
              <h4 className="heading-6">Total</h4>
              <p className="text-sm capitalize">${total}</p>
            </div>

            <button
              className="button-1"
              onClick={handleNextStep}
              disabled={false}
            >
              {checkoutSteps[step - 1]?.button}
            </button>
          </div>
        </div>
      </div>
    </section>
  ) : (
    <section>
      <div className="container h-full flex justify-center items-center">
        <img src={img} alt="empty-cart" />
      </div>
    </section>
  );
};

export default CheckoutPage;
