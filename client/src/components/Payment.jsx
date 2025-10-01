import React from "react";
import { useSelector } from "react-redux";
import CheckoutCart from "./CheckoutCart";

const Payment = () => {
  const {
    data: {
      user: { fullAddress, name },
    },
  } = useSelector((state) => state.user);
  return (
    <div className="col-span-8">
      <h1 className="heading-1">Shipping Address</h1>
      <div>
        <p className="body-text">
          {fullAddress?.address}, {fullAddress?.postalCode},
          <br />
          {fullAddress?.city}, {fullAddress?.country}
        </p>
      </div>
      <CheckoutCart update={false} />
    </div>
  );
};

export default Payment;
