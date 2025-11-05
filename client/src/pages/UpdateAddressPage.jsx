import React from "react";
import { useDispatch } from "react-redux";
import { updateProfile } from "../features/user.slice";
import AddressForm from "../components/AddressForm";

const UpdateAddressPage = () => {
  const dispatch = useDispatch();
  const updateForm = (data) => {
    dispatch(updateProfile(data));
  };
  return (
    <div className="flex flex-col">
      <h1 className="heading-1 text-red-500 text-sm mb-12.5">Address</h1>
      <div className="">
        <AddressForm submitFunction={updateForm} />
      </div>
    </div>
  );
};

export default UpdateAddressPage;
