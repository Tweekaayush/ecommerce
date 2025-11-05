import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addDecimals } from "../utils/cartUtils";
import { setCoupon } from "../features/cart.slice";

const CouponModal = ({ open, setOpen, ref }) => {
  const dispatch = useDispatch();
  const {
    data: { coupons },
  } = useSelector((state) => state.user);
  const {
    loading: cartLoading,
    data: { cart, total, subTotal, discount, shippingAddress, coupon },
  } = useSelector((state) => state.cart);
  return (
    <div
      className={`${
        open ? "flex" : "hidden"
      } fixed top-0 left-0 w-full h-full bg-overlay justify-center items-center z-50`}
    >
      <div
        ref={ref}
        className="w-[400px] h-fit shadow-card bg-white flex flex-col p-4 rounded-lg"
      >
        <h1 className="heading-1 text-red-500 text-sm mb-8">
          My Coupons ({coupons?.length})
        </h1>
        {coupons?.length ? (
          <div className="flex flex-col gap-4 h-60 overflow-y-scroll">
            {coupons.map((c, i) => {
              return (
                <div
                  className="rounded-lg overflow-hidden bg-gray-100 shadow-card flex h-25"
                  key={c?.expirationDate}
                >
                  <div className="bg-red-500 text-white p-2 text-vertical uppercase h-f">
                    {c?.discountPercentage}% off
                  </div>
                  <div className="flex flex-col flex-1 p-2">
                    <div className="flex border-b border-dashed pb-2">
                      <div className="flex flex-col flex-1">
                        <h1 className="font-extrabold">{c.code}</h1>
                        <p className="body-text font-bold text-green-500">
                          Save $
                          {addDecimals(
                            (subTotal * c?.discountPercentage) / 100
                          )}{" "}
                          on the order!
                        </p>
                      </div>
                      <button
                        className="heading-1 text-red-500 text-sm cursor-pointer"
                        onClick={() => [dispatch(setCoupon(c)), setOpen(false)]}
                      >
                        Apply
                      </button>
                    </div>
                    <div className="pt-1">
                      <p className="text-xs">
                        Expires on: {c?.expirationDate.split("T")[0]}
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
  );
};

export default CouponModal;
