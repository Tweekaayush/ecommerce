import { Link, useLocation, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../slices/user.slice";
import { useEffect } from "react";

const LoginPage = () => {
  const { state } = useLocation();
  const {
    data: {
      user: { _id },
    },
  } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ ...formData }));
  };

  useEffect(() => {
    if (_id) {
      state ? navigate(state.previousURL) : navigate("/profile");
    }
  }, [_id]);
  return (
    <section className="min-h-screen bg-gray-100">
      <div className="container flex justify-center items-center h-full">
        <div className="flex flex-col justify-center items-center bg-white w-fit min-w-[400px] py-8 px-4 rounded-sm shadow-md">
          <h1 className="heading-2 mb-3.5">Login</h1>
          <p className="body-text mb-7">We are so excited to see you!</p>
          <form onSubmit={handleSubmit} className="flex flex-col w-full gap-4">
            <label htmlFor="email" className="form-label">
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="form-input"
              />
              <span>email</span>
              {formErrors.email && <p className="form-error-msg">error</p>}
            </label>
            <label htmlFor="password" className="form-label">
              <input
                type="password"
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                className="form-input"
              />
              <span>password</span>
              {formErrors.password && <p className="form-error-msg">error</p>}
            </label>
            <button className="button-2">Login</button>
            <p className="body-text">
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-500">
                {" "}
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
