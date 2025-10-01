import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

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
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitFunction(formData);
  };

  useEffect(() => {
    if (fullAddress) {
      setFormData({ ...fullAddress });
    }
  }, [fullAddress]);

  return (
    <form action="" className="grid grid-cols-2 overflow-hidden transition-all 0.3s ease-in-out duration-300 gap-4 pt-4" onSubmit={handleSubmit}>
      <label htmlFor="address" className="form-label col-span-2">
        <input
          className="form-input"
          type="text"
          name="address"
          id="address"
          onChange={handleChange}
          value={formData.address}
        />
        <span>address</span>
      </label>
      <label htmlFor="postalCode" className="form-label col-span-2">
        <input
          className="form-input"
          type="text"
          name="postalCode"
          id="postalCode"
          onChange={handleChange}
          value={formData.postalCode}
        />
        <span>postal code</span>
      </label>
      <label htmlFor="city" className="form-label col-span-1">
        <input
          className="form-input"
          type="text"
          name="city"
          id="city"
          onChange={handleChange}
          value={formData.city}
        />
        <span>city</span>
      </label>
      <label htmlFor="country" className="form-label col-span-1">
        <input
          className="form-input"
          type="text"
          name="country"
          id="country"
          onChange={handleChange}
          value={formData.country}
        />
        <span>country</span>
      </label>
      <button type="submit" disabled={loading} className="button-1 col-span-1">
        Update
      </button>
    </form>
  );
};

export default AddressForm;
