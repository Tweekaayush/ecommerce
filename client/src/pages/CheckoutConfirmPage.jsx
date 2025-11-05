import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCoupon, validateCoupon } from "../features/cart.slice";
import Skeleton from "../components/Skeleton";
import { addDecimals } from "../utils/cartUtils";
import OrderItem from "../components/OrderItem";

const CheckoutConfirmPage = ({ setOpen }) => {
  const {
    loading: userLoading,
    data: {
      user: { fullAddress, name },
    },
  } = useSelector((state) => state.user);

  const {
    loading: cartLoading,
    data: { coupon, subTotal, cart },
  } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState(coupon?.code || "");

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col pb-8 border-b border-dashed">
        <h1 className="heading-1 text-red-500 text-sm md:text-base mb-8">
          Shipping Address
        </h1>
        <div className="">
          {!userLoading ? (
            <p className="body-text">
              {fullAddress?.address}, {fullAddress?.postalCode},
              <br />
              {fullAddress?.city}, {fullAddress?.country}
            </p>
          ) : (
            <Skeleton classname="w-full h-20" />
          )}
        </div>
      </div>
      <div className="flex pb-8 border-b border-dashed gap-8 flex-col md:flex-row">
        <div className="flex flex-col">
          <h1 className="heading-1 text-red-500 text-sm md:text-base mb-8">Coupon</h1>
          <form
            className="flex gap-4 w-fit mb-4"
            onSubmit={(e) => [
              e.preventDefault(),
              dispatch(validateCoupon(formData)),
            ]}
          >
            <input
              type="text"
              className="form-input uppercase"
              value={formData}
              onChange={(e) => setFormData(e.target.value)}
            />
            <button
              type="submit"
              className="px-4 py-2.5 bg-red-500 text-white rounded-sm cursor-pointer"
              disabled={cartLoading}
            >
              Apply
            </button>
          </form>
          <p
            className="body-text underline text-blue-400 cursor-pointer"
            onClick={() => {
              setOpen(true);
            }}
          >
            Your available coupons
          </p>
        </div>
        {coupon ? (
          <div className="flex items-center">
            <div
              className="rounded-lg overflow-hidden bg-gray-100 shadow-card flex h-25"
              key={coupon?.expirationDate}
            >
              <div className="bg-red-500 text-white p-2 text-vertical uppercase h-f">
                {coupon?.discountPercentage}% off
              </div>
              <div className="flex flex-col flex-1 p-2">
                <div className="flex border-b border-dashed pb-2">
                  <div className="flex flex-col flex-1">
                    <h1 className="font-extrabold">{coupon?.code}</h1>
                    <p className="body-text font-bold text-green-500">
                      Save $
                      {addDecimals(
                        (subTotal * coupon?.discountPercentage) / 100
                      )}{" "}
                      on the order!
                    </p>
                  </div>
                  <button
                    className="heading-1 text-red-500 text-sm cursor-pointer"
                    onClick={() => [dispatch(setCoupon(null)), setOpen(false)]}
                  >
                    remove
                  </button>
                </div>
                <div className="pt-1">
                  <p className="text-xs">
                    Expires on: {coupon?.expirationDate.split("T")[0]}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className="flex flex-col w-full">
        <h1 className="mb-8 heading-1 text-red-500 text-sm md:text-base">Cart Items</h1>
        <div className="grid grid-cols-[5fr_2fr_3fr_2fr] mb-8">
          <span className="list-head">product</span>
          <span className="list-head">price</span>
          <span className="list-head">quantity</span>
          <span className="list-head">subtotal</span>
        </div>
        <ul className="flex flex-col w-full gap-4">
          {!cartLoading
            ? cart?.map((item) => {
                return (
                  <OrderItem
                    key={item._id}
                    {...item.product}
                    quantity={item.quantity}
                    update={false}
                  />
                );
              })
            : new Array(1).fill(0).map((_, i) => {
                return <Skeleton key={i} classname="w-full h-30" />;
              })}
        </ul>
      </div>
    </div>
  );
};

export default CheckoutConfirmPage;
