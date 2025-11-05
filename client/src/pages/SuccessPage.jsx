import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { validateOrder } from "../features/order.slice";
import { CircleCheckBig, LoaderCircle } from "lucide-react";
import Skeleton from "../components/Skeleton";

const SuccessPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { sessionId } = useParams();

  const {
    loading,
    data: { orderId },
  } = useSelector((state) => state.order);

  useEffect(() => {
    if (sessionId) dispatch(validateOrder({ sessionId }));
  }, [sessionId]);

  useEffect(() => {
    document.title = "Order Placed";
  }, []);

  return (
    <section className="min-h-screen flex justify-center items-center">
      <div className="container flex flex-col items-center justify-center h-full">
        <CircleCheckBig className="text-green-600 h-20 w-20 md:h-30 md:w-30 mb-4" />
        <h1 className="text-green-600 text-2xl md:text-4xl tracking-wider font-extrabold mb-4">
          Thank You!
        </h1>
        <p className="body-text tracking-wider text-gray-700 mb-7">
          Your order has been placed successfully.
        </p>
        <div className="p-4 bg-gray-200 mb-4 rounded-sm flex gap-4">
          <h1 className="heading-1 text-sm">Order Id:</h1>

          {!loading ? (
            <p className="body-text">{orderId}</p>
          ) : (
            <Skeleton classname="h-6 w-60" />
          )}
        </div>
        <button
          className="button-1 mb-4"
          onClick={() => navigate(`/order/${orderId}`)}
          disabled={loading}
        >
          {loading ? (
            <LoaderCircle className="animate-spin mx-auto" />
          ) : (
            "go to your order"
          )}
        </button>
      </div>
    </section>
  );
};

export default SuccessPage;
