import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOrderById, retryPayment, updateOrder } from "../slices/order.slice";
import { ChevronDown, LoaderCircle, TriangleAlert } from "lucide-react";
import Skeleton from "../components/Skeleton";
import { addDecimals } from "../utils/cartUtils";

const OrderItem = (props) => {
  const {
    product: { _id, name, brand, image },
    quantity,
    price,
  } = props;

  return (
    <div className="grid grid-cols-[5fr_2fr_3fr_2fr]  sm:grid-cols-[2fr_3fr_2fr_3fr_2fr] border border-gray-400 min-h-20">
      <div className="hidden md:flex items-center h-full bg-gray-100">
        <img
          src={image}
          alt={name}
          className="w-full object-cover object-[50%_50%] mix-blend-multiply"
        />
      </div>
      <div className="p-2">
        <h1 className="text-sm heading-2">{name}</h1>
        <p className="text-sm text-gray-600">Brand: {brand}</p>
      </div>
      <p className="text-sm font-semibold py-2 text-center">${price}</p>
      <div className="h-7 text-sm text-center p-2">{quantity}</div>
      <p className="text-sm font-semibold text-center py-2 pr-2">
        ${price * quantity}
      </p>
    </div>
  );
};

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
    document.title = "Order Details";
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
              <p className="body-text">
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
            <div className="grid grid-cols-[5fr_2fr_3fr_2fr] gap-4 mb-8 text-center pb-2 border-b-1 border-gray-200">
              <span className="list-head">Product</span>
              <span className="list-head">price</span>
              <span className="list-head">Quantity</span>
              <span className="list-head">total</span>
            </div>
            <div className="flex flex-col gap-4">
              {!loading
                ? products?.map((item) => {
                    return <OrderItem key={item?.product?._id} {...item} />;
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
              <h4 className="heading-2 text-sm">Subtotal</h4>
              {!loading ? (
                <p className="text-sm capitalize">
                  $
                  {addDecimals(
                    (totalAmount * 100) / (100 - discountPercentage)
                  )}
                </p>
              ) : (
                <Skeleton classname="h-5 w-16" />
              )}
            </div>
            <div className="flex justify-between mb-4 border-b border-dashed pb-4">
              <h4 className="heading-2 text-sm">Discount</h4>
              {!loading ? (
                <p className="text-sm capitalize">
                  $
                  {Math.abs(
                    addDecimals(
                      totalAmount -
                        (totalAmount * 100) / (100 - discountPercentage)
                    )
                  )}
                </p>
              ) : (
                <Skeleton classname="h-5 w-16" />
              )}
            </div>
            <div className="flex justify-between mb-4">
              <h4 className="heading-2 text-sm">Total</h4>
              {!loading ? (
                <p className="text-sm capitalize">${totalAmount}</p>
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

          {user?.toString() === userId?.toString() &&
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
