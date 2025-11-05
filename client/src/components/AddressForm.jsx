import { LoaderCircle } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FormButton from "./FormButton";
import FormInput from "./FormInput";

const AddressForm = ({ submitFunction }) => {
  const {
    loading,
    data: {
      user: { fullAddress },
    },
  } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "postalCode" && !isFinite(Number(value))) return;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitFunction({ fullAddress: formData });
  };

  useEffect(() => {
    if (fullAddress) {
      setFormData({ ...fullAddress });
    }
  }, [fullAddress]);

  return (
    <form
      className="grid grid-cols-2 overflow-hidden transition-all 0.3s ease-in-out duration-300 gap-4 pt-4"
      onSubmit={handleSubmit}
    >
      <FormInput
        type="text"
        name="address"
        handleChange={handleChange}
        value={formData.address}
        cls="form-input-2"
        lblcls="col-span-2"
      />
      <FormInput
        type="text"
        name="postalCode"
        handleChange={handleChange}
        value={formData.postalCode}
        cls="form-input-2"
        lblcls="col-span-2"
      />
      <FormInput
        type="text"
        name="city"
        handleChange={handleChange}
        value={formData.country}
        cls="form-input-2"
        lblcls="col-span-1"
      />
      <FormInput
        type="text"
        name="country"
        handleChange={handleChange}
        value={formData.country}
        cls="form-input-2"
        lblcls="col-span-1"
      />
      <FormButton loading={loading} value="Save Changes" />
    </form>
  );
};

export default AddressForm;
