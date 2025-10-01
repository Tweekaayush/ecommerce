import React, { useEffect, useState, useCallback } from "react";
import CheckoutSteps from "../components/CheckoutSteps";
import { useDispatch, useSelector } from "react-redux";
// import ShippingAddress from "../components/ShippingAddress";
// import CheckoutCart from "../components/CheckoutCart";
// import Payment from "../components/Payment";
import { saveShippingAddress } from "../slices/cart.slice";
import img from "/assets/cart/empty-cart.png";
import { ShoppingCart, NotebookTabs, CreditCard } from "lucide-react";
import CheckoutCart from "../components/CheckoutCart";
import Payment from "../components/Payment";
import ShippingAddress from "../components/ShippingAddress";

const CheckoutPage = () => {
  const {
    data: { cart, total, subtotal },
  } = useSelector((state) => state.cart);
  const {
    loading: userLoading,
    data: {
      user: { fullAddress },
    },
  } = useSelector((state) => state.user);
  const [step, setStep] = useState(1);
  const dispatch = useDispatch();

  const checkoutSteps = [
    {
      name: "Cart",
      component: <CheckoutCart />,
      button: "Continue",
      icon: <ShoppingCart />,
    },
    {
      name: "Shipping Address",
      component: <ShippingAddress />,

      button: "Continue",
      icon: <NotebookTabs />,
    },
    {
      name: "Payment",
      component: <Payment />,

      button: "place order",
      icon: <CreditCard />,
    },
  ];

  const ActiveComponent = useCallback(() => {
    return checkoutSteps[step - 1]?.component;
  }, [step]);

  const handleNextStep = () => {
    if (step > checkoutSteps.length) return;
    // const res = checkoutSteps[step - 1].func();
    // if (res)
    setStep((p) => p + 1);
  };

  useEffect(() => {
    document.title = checkoutSteps[step - 1].name;
  }, [step]);

  return cart?.length !== 0 ? (
    <section>
      <CheckoutSteps
        stepNo={step}
        checkoutSteps={checkoutSteps}
        setStep={setStep}
      />
      <div className="container grid grid-cols-12 gap-4 h-screen mt-20">
        <ActiveComponent />
        <div className="flex flex-col py-8 px-4 h-fit shadow-card col-span-4">
          <h1 className="heading-1 mb-4">cart summary</h1>
          <div className="flex justify-between mb-4">
            <h4 className="heading-6">Items Price</h4>
            <p className="text-sm capitalize">${total}</p>
          </div>

          <div className="flex justify-between mb-4 border-t pt-4 border-dashed">
            <h4 className="heading-6">Total Price</h4>
            <p className="text-sm capitalize">${subtotal}</p>
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
    </section>
  ) : (
    <section>
      <div className="container w-full h-[90vh] flex justify-center items-center">
        <img src={img} alt="empty-cart" />
      </div>
    </section>
  );
};

export default CheckoutPage;
