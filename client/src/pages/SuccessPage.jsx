import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { validateOrder } from "../slices/order.slice";
import { CircleCheckBig } from "lucide-react";

const SuccessPage = () => {
  //   const { search } = useLocation();
  const sessionId = new URLSearchParams(location.search).get("session_id");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    data: { orderId },
  } = useSelector((state) => state.order);
  useEffect(() => {
    dispatch(validateOrder({ sessionId }));
  }, [sessionId]);
  return (
    <section className="h-screen">
      <div className="container flex flex-col items-center justify-center h-full">
        <CircleCheckBig className="text-green-600 w-15 h-15" />
        <h1 className="text-green-600 text-5xl tracking-wider font-extrabold mb-2">
          Thank You!
        </h1>
        <p className="text-xl tracking-wider text-gray-700 mb-4">
          Your order has been placed successfully.
        </p>
        <div className="p-4 bg-gray-200 mb-4 rounded-sm">
          <h1 className="heading-5">Order Id:</h1>
          <p className="body-text">{orderId}</p>
        </div>
        <button className="button-1 mb-4" onClick={() => navigate("/profile")}>
          go to your order
        </button>
      </div>
    </section>
  );
};

export default SuccessPage;
