import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../features/user.slice";
import FormButton from "../components/FormButton";
import FormInput from "../components/FormInput";

const UpdateProfilePage = () => {
  const {
    loading,
    data: {
      user: { name, email },
    },
  } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    name: name,
    email: email,
    password: "",
  });

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfile(formData));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  return (
    <div className="flex flex-col">
      <h1 className="heading-1 text-red-500 text-sm mb-12.5">Privacy</h1>
      <form className="flex flex-col w-full gap-4" onSubmit={handleSubmit}>
        <FormInput
          type="text"
          name="name"
          handleChange={handleChange}
          value={formData.name}
          cls="form-input-2"
        />
        <FormInput
          type="email"
          name="email"
          handleChange={handleChange}
          value={formData.email}
          cls="form-input-2"
        />
        <FormInput
          type="password"
          name="password"
          handleChange={handleChange}
          value={formData.password}
          cls="form-input-2"
        />
        <FormButton loading={loading} value="Save Changes" />
      </form>
    </div>
  );
};

export default UpdateProfilePage;
