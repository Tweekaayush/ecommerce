import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getOrderById,
  retryPayment,
  updateOrder,
} from "../features/order.slice";
import { ChevronDown, LoaderCircle, TriangleAlert } from "lucide-react";
import Skeleton from "../components/Skeleton";
import { addDecimals } from "../utils/cartUtils";
import OrderItem from "../components/OrderItem";

const OrderPage = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { id } = useParams();
  const {
    data: {
      loading,
      orderDetails: {
        shippingAddress,
        products,
        totalAmount,
        deliveredAt,
        cancelledAt,
        orderStatus,
        discountPercentage,
        paymentStatus,
        stripeSessionId,
        user: orderUser,
      },
    },
  } = useSelector((state) => state.order);

  const {
    data: {
      user: { _id: userId, role, email },
      user,
    },
  } = useSelector((state) => state.user);

  const ref = useRef(0);

  const handleClickOutside = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    dispatch(getOrderById(id));
  }, [id]);

  const handleUpdate = (status) => {
    if (orderStatus === status) return;
    dispatch(updateOrder({ id: id, orderStatus: status }));
    setOpen(false);
  };

  useEffect(() => {
    document.title = `Order Id - ${id}`;
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <section className="min-h-screen flex justify-center items-center flex-col">
      {paymentStatus !== "paid" &&
        userId?.toString() === orderUser?.toString() && (
          <div className="container flex gap-4 mb-8 p-4 border rounded-lg">
            <TriangleAlert className="w-10 h-10 text-yellow-500" />
            <div className="flex flex-col">
              <h1 className="heading-2">
                Your payment was declined while placing your order!
              </h1>
              <p className="body-text">You can try to place the order again.</p>
            </div>
          </div>
        )}
      <div className="container grid grid-cols-[1fr] lg:grid-cols-[8fr_4fr] gap-4">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <h1 className="heading-1 text-red-500 text-sm mb-6">
              Shipping Address
            </h1>

            {!loading ? (
              <p className="body-text text-gray-700">
                {shippingAddress?.address}, {shippingAddress?.postalCode},
                <br />
                {shippingAddress?.city}, {shippingAddress?.country}
              </p>
            ) : (
              <Skeleton classname="w-full h-40" />
            )}
          </div>

          <div className="flex flex-col">
            <h1 className="heading-1 text-red-500 text-sm mb-8">Order Items</h1>
            <div className="grid grid-cols-[5fr_2fr_3fr_2fr] gap-4 mb-8 pb-2 border-b border-gray-200">
              <span className="list-head">Product</span>
              <span className="list-head">price</span>
              <span className="list-head">Quantity</span>
              <span className="list-head">total</span>
            </div>
            <div className="flex flex-col gap-4">
              {!loading
                ? products?.map((item) => {
                    return (
                      <OrderItem
                        key={item?.product?._id}
                        {...item}
                        {...item?.product}
                      />
                    );
                  })
                : new Array(2).fill(0).map((_, i) => {
                    return <Skeleton classname="w-full h-30" key={i} />;
                  })}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col py-8 px-4 h-fit shadow-card max-w-[400px]">
            <h1 className="heading-1 text-red-500 text-sm mb-4">
              Order summary
            </h1>
            <div className="flex justify-between mb-4">
              <h4 className="heading-2 text-sm md:text-base">Subtotal</h4>
              {!loading ? (
                <div className="flex">
                  <span className="text-xs ">$</span>
                  <p className="text-sm md:text-base ml-0.5 font-medium">
                    {addDecimals(
                      (totalAmount * 100) / (100 - discountPercentage)
                    )}
                  </p>
                </div>
              ) : (
                <Skeleton classname="h-5 w-16" />
              )}
            </div>
            <div className="flex justify-between mb-4 border-b border-dashed pb-4">
              <h4 className="heading-2 text-sm md:text-base">Discount</h4>
              {!loading ? (
                <div className="flex">
                  <span className="text-xs ">$</span>
                  <p className="text-sm md:text-base ml-0.5 font-medium">
                    {Math.abs(
                      addDecimals(
                        totalAmount -
                          (totalAmount * 100) / (100 - discountPercentage)
                      )
                    )}
                  </p>
                </div>
              ) : (
                <Skeleton classname="h-5 w-16" />
              )}
            </div>
            <div className="flex justify-between mb-4">
              <h4 className="heading-2 text-sm md:text-base">Total</h4>
              {!loading ? (
                <div className="flex">
                  <span className="text-xs ">$</span>
                  <p className="text-sm md:text-base ml-0.5 font-medium">{totalAmount}</p>
                </div>
              ) : (
                <Skeleton classname="h-5 w-16" />
              )}
            </div>
          </div>

          <div className="flex flex-col py-8 px-4 h-fit shadow-card max-w-[400px]">
            <h1 className="heading-1 text-red-500 text-sm mb-4">
              Order Status
            </h1>
            {cancelledAt && (
              <p className="text-sm tracking-wider">
                Cancelled on {cancelledAt.split("T")[0]}
              </p>
            )}
            {deliveredAt && (
              <p className="text-sm tracking-wider">
                Delivered on {deliveredAt.split("T")[0]}
              </p>
            )}
            {orderStatus === "processing" && user?.role === "customer" && (
              <p className="text-sm capitalize tracking-wider">In Transit.</p>
            )}
            {!cancelledAt && !deliveredAt && user?.role === "admin" && (
              <div className="relative">
                <div
                  className="w-full heading-1 text-sm flex items-center justify-center p-2 border border-gray-500 cursor-pointer"
                  onClick={() => setOpen((prev) => !prev)}
                  ref={ref}
                >
                  {!loading ? (
                    orderStatus
                  ) : (
                    <LoaderCircle className="animate-spin" />
                  )}
                </div>
                <div
                  className={`${open ? "flex flex-col" : "hidden"}
                absolute w-full bg-white border-x border-b border-gray-400`}
                >
                  {orderStatus !== "processing" && (
                    <div
                      onClick={() => handleUpdate("processing")}
                      className="heading-1 text-sm p-2 flex justify-center items-center border-b border-gray-400 hover:bg-gray-200 cursor-pointer"
                    >
                      processing
                    </div>
                  )}
                  {orderStatus !== "delivered" && (
                    <div
                      onClick={() => handleUpdate("delivered")}
                      className="heading-1 text-sm p-2 flex justify-center items-center border-b border-gray-400 hover:bg-gray-200 cursor-pointer"
                    >
                      delivered
                    </div>
                  )}
                  {orderStatus !== "cancel" && (
                    <div
                      onClick={() => handleUpdate("cancel")}
                      className="heading-1 text-sm p-2 flex justify-center items-center hover:bg-gray-200 cursor-pointer"
                    >
                      cancel
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {orderUser?.toString() === userId?.toString() &&
            !cancelledAt &&
            !deliveredAt &&
            paymentStatus === "unpaid" && (
              <button
                onClick={() => {
                  dispatch(retryPayment({ sessionId: stripeSessionId, email }));
                }}
                disabled={loading}
                className="button-1"
              >
                {loading ? (
                  <LoaderCircle className="animate-spin mx-auto" />
                ) : (
                  "Retry Payment"
                )}
              </button>
            )}
          {orderUser?.toString() === userId?.toString() &&
            !cancelledAt &&
            !deliveredAt && (
              <button
                onClick={() => handleUpdate("cancel")}
                className="button-2"
                disabled={loading}
              >
                {loading ? (
                  <LoaderCircle className="animate-spin mx-auto" />
                ) : (
                  "Cancel Order"
                )}
              </button>
            )}
        </div>
      </div>
    </section>
  );
};

export default OrderPage;
