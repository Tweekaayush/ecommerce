import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOrderById, updateOrder } from "../slices/order.slice";
import { ChevronDown } from "lucide-react";

const OrderItem = (props) => {
  const {
    product: { _id, name, brand, image },
    quantity,
    price,
  } = props;

  return (
    <div className="grid grid-cols-12 border border-gray-400 min-h-36">
      <div className="flex items-center h-full bg-gray-100 col-span-2">
        <img
          src={image}
          alt={name}
          className="w-full object-cover object-[50%_50%] mix-blend-multiply"
        />
      </div>
      <div className="p-2 col-span-4">
        <h4 className="text-sm text-black">{name}</h4>
        <p className="text-sm text-gray-600">Brand: {brand}</p>
      </div>
      <p className="text-sm font-extrabold col-span-2 py-2 text-center">
        ${price}
      </p>
      <div className="h-7 text-sm text-center p-2 col-span-2 ">{quantity}</div>
      <p className="text-sm font-extrabold col-span-2 text-center py-2 pr-2">
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
      orderDetails: {
        shippingAddress,
        products,
        totalAmount,
        deliveredAt,
        cancelledAt,
        orderStatus,
        discountPercentage,
      },
    },
  } = useSelector((state) => state.order);

  const {
    data: {
      user: { role },
    },
  } = useSelector((state) => state.user);

  const deliverOrder = () => {
    // dispatch((id));
  };
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
  }, []);
  let subtotal = 0;
  useEffect(() => {
    subtotal = products?.reduce(
      (acc, cur) => acc + cur.quantity * cur.price,
      0
    );
  }, [products]);

  return (
    <section className="h-screen flex justify-center items-center">
      <div className="container grid grid-cols-12 gap-4">
        <div className="flex flex-col col-span-8 gap-4">
          <div className="flex flex-col">
            <h1 className="heading-1 mb-6">Shipping Address</h1>

            <p className="body-text">
              {shippingAddress?.address}, {shippingAddress?.postalCode},
              <br />
              {shippingAddress?.city}, {shippingAddress?.country}
            </p>
            {/* <p className={`status ${isDelivered ? "true" : false}`}>
              {isDelivered ? `Delivered on ${deliveredAt}` : "Not Delivered"}
            </p> */}
          </div>
          {/* <div className="order-payment">
            <h1 className="heading-3">Payment Method</h1>

            <h4>Method: {paymentMethod}</h4>
            <p className={`status ${isPaid ? "true" : false}`}>
              {isPaid ? `Paid on ${paidAt}` : "Not Paid"}
            </p>
          </div> */}

          <div className="flex flex-col">
            <h1 className="heading-1 mb-8">Order Items</h1>
            <div className="grid grid-cols-12 gap-4 mb-8 text-center pb-2 border-b-1 border-gray-200">
              <span className="list-head col-span-6">Product</span>
              <span className="list-head col-span-2">price</span>
              <span className="list-head col-span-2">Quantity</span>
              <span className="list-head col-span-2">total</span>
            </div>
            <div className="flex flex-col gap-4">
              {products?.map((item) => {
                return <OrderItem key={item?.product?._id} {...item} />;
              })}
            </div>
          </div>
        </div>
        <div className="col-span-4 flex flex-col gap-4">
          <div className="flex flex-col py-8 px-4 h-fit shadow-card">
            <h1 className="heading-1 mb-4">Order summary</h1>
            <div className="flex justify-between mb-4">
              <h4 className="heading-6">Subtotal</h4>
              <p className="text-sm capitalize">${subtotal}</p>
            </div>
            <div className="flex justify-between mb-4 border-b border-dashed pb-4">
              <h4 className="heading-6">Discount</h4>
              <p className="text-sm capitalize"> ${totalAmount - subtotal}</p>
            </div>
            <div className="flex justify-between mb-4">
              <h4 className="heading-6">Total</h4>
              <p className="text-sm capitalize">${totalAmount}</p>
            </div>
          </div>
          {role === "admin" && (
            <div className="flex flex-col py-8 px-4 h-fit shadow-card">
              <h1 className="heading-1 mb-4">Order Status</h1>
              {cancelledAt && (
                <p className="text-sm capitalize tracking-wider">
                  {orderStatus} on {cancelledAt.split("T")[0]}
                </p>
              )}
              {deliveredAt && (
                <p className="text-sm capitalize tracking-wider">
                  {orderStatus} on {deliveredAt.split("T")[0]}
                </p>
              )}
              {orderStatus === "processing" && role === "customer" && (
                <p className="text-sm capitalize tracking-wider">In Transit.</p>
              )}
              {!cancelledAt && !deliveredAt && (
                <div className="relative">
                  <div
                    className="w-full heading-5 flex items-center justify-center p-2 border border-gray-500 cursor-pointer"
                    onClick={() => setOpen((prev) => !prev)}
                  >
                    {orderStatus}
                  </div>
                  <div
                    className={`${open ? "flex flex-col" : "hidden"}
                absolute w-full bg-white border-x border-b border-gray-400`}
                  >
                    {orderStatus !== "processing" && (
                      <div
                        onClick={() => handleUpdate("processing")}
                        className="heading-5 p-2 flex justify-center items-center border-b border-gray-400 hover:bg-gray-200 cursor-pointer"
                      >
                        processing
                      </div>
                    )}
                    {orderStatus !== "delivered" && (
                      <div
                        onClick={() => handleUpdate("delivered")}
                        className="heading-5 p-2 flex justify-center items-center border-b border-gray-400 hover:bg-gray-200 cursor-pointer"
                      >
                        delivered
                      </div>
                    )}
                    {orderStatus !== "cancel" && (
                      <div
                        onClick={() => handleUpdate("cancel")}
                        className="heading-5 p-2 flex justify-center items-center hover:bg-gray-200 cursor-pointer"
                      >
                        cancel
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default OrderPage;
