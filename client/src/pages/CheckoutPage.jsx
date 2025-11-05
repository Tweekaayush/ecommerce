import React from "react";
import Skeleton from "../components/Skeleton";
import { useSelector } from "react-redux";
import OrderItem from "../components/OrderItem";

const CheckoutPage = () => {
  const {
    loading,
    data: { cart },
  } = useSelector((state) => state.cart);
  return (
    <div className="flex flex-col w-full">
      <h1 className="mb-8 heading-1 text-red-500 text-sm">Cart Items</h1>
      <div className="grid grid-cols-[5fr_2fr_3fr_2fr] mb-8">
        <span className="list-head">product</span>
        <span className="list-head">price</span>
        <span className="list-head">quantity</span>
        <span className="list-head">subtotal</span>
      </div>
      <ul className="flex flex-col w-full gap-4">
        {!loading
          ? cart?.map((item) => {
              return (
                <OrderItem
                  key={item._id}
                  {...item.product}
                  quantity={item.quantity}
                  update={true}
                />
              );
            })
          : new Array(1).fill(0).map((_, i) => {
              return <Skeleton key={i} classname="w-full h-30" />;
            })}
      </ul>
    </div>
  );
};

export default CheckoutPage;
