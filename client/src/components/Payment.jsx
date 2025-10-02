import React from "react";
import { useSelector } from "react-redux";
import CheckoutCart from "./CheckoutCart";

const Payment = ({setOpen}) => {
  const {
    data: {
      user: { fullAddress, name },
    },
  } = useSelector((state) => state.user);
  return (
    <div className="flex flex-col gap-4 col-span-8">
      <div className="flex flex-col pb-8 border-b border-dashed">
        <h1 className="heading-1 mb-8">Shipping Address</h1>
        <div className="">
          <p className="body-text">
            {fullAddress?.address}, {fullAddress?.postalCode},
            <br />
            {fullAddress?.city}, {fullAddress?.country}
          </p>
        </div>
      </div>
      <div className="flex flex-col pb-8 border-b border-dashed">
        <h1 className="heading-1 mb-8">Coupon</h1>
        <form className="flex gap-4 w-fit mb-4">
          <input type="text" className="form-input" />
          <button
            type="submit"
            className="px-4 py-2.5 bg-red-500 text-white rounded-sm"
          >
            Apply
          </button>
        </form>
        <p
          className="body-text underline text-blue-400 cursor-pointer"
          onClick={() => {setOpen(true)}}
        >
          Your available coupons
        </p>
      </div>
      <CheckoutCart update={false} />
    </div>
  );
};

export default Payment;
