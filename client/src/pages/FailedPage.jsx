import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CircleAlert } from "lucide-react";
import { clearCartItems } from "../features/cart.slice";

const FailedPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearCartItems());
    document.title = "Payment Failed";
  }, []);
  return (
    <section className="min-h-screen flex justify-center items-center">
      <div className="container flex flex-col items-center justify-center h-full">
        <CircleAlert className="text-red-600 h-20 w-20 md:h-30 md:w-30 mb-4" />
        <h1 className="text-red-600 text-2xl md:text-4xl tracking-wider font-extrabold mb-4">
          Payment failed!
        </h1>
        <p className="body-text text-gray-700 mb-7">
          Something went wrong with your order's payment.
        </p>
        <button className="button-1" onClick={() => navigate("/browse")}>
          Continue Shopping
        </button>
      </div>
    </section>
  );
};

export default FailedPage;
