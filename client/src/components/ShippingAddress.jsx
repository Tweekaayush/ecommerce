import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddressForm from "./AddressForm";

const ShippingAddress = () => {
  const {
    data: {
      user: { name, fullAddress },
    },
  } = useSelector((state) => state.user);

  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = (data) => {
    // dispatch()
  };

  useEffect(() => {
    if (fullAddress?.address) setOpen(false);
    else setOpen(true);
  }, [fullAddress?.address]);

  return (
    <div className="flex flex-col">
      <h1 className="heading-1 mb-7">Shipping Adress</h1>
      {fullAddress && fullAddress?.address && (
        <div className="mb-4">
          <p className="body-text">
            {fullAddress?.address}, {fullAddress?.postalCode},
            <br />
            {fullAddress?.city}, {fullAddress?.country}
          </p>
        </div>
      )}
      <div className="flex flex-col">
        <button
          onClick={() => setOpen(!open)}
          className="border border-dashed p-4 cursor-pointer text-left "
        >
          {fullAddress?.postalCode ? "Edit Address" : "Add Address +"}
        </button>
        <div
          className="overflow-hidden transition-[max-height] duration-300 ease-in-out"
          style={{ maxHeight: open ? "300px" : 0 }}
        >
          <AddressForm />
        </div>
      </div>
    </div>
  );
};

export default ShippingAddress;
