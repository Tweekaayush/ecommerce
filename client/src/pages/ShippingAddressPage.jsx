import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddressForm from "../components/AddressForm";
import { updateProfile } from "../features/user.slice";
import Skeleton from "../components/Skeleton";

const ShippingAddressPage = () => {
  const {
    loading,
    data: {
      user: { name, fullAddress },
    },
  } = useSelector((state) => state.user);

  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = (data) => {
    dispatch(updateProfile(data));
  };

  useEffect(() => {
    if (fullAddress?.address) setOpen(false);
    else setOpen(true);
  }, [fullAddress?.address]);

  return (
    <div className="flex flex-col">
      <h1 className="heading-1 text-red-500 text-sm mb-7">Shipping Address</h1>

      <div className="mb-4">
        {!loading ? (
          <p className="body-text">
            {fullAddress?.address}, {fullAddress?.postalCode},
            <br />
            {fullAddress?.city}, {fullAddress?.country}
          </p>
        ) : (
          <Skeleton classname="w-full h-20" />
        )}
      </div>

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
          <AddressForm submitFunction={handleSubmit} />
        </div>
      </div>
    </div>
  );
};

export default ShippingAddressPage;
