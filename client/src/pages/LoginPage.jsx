import { Link, useLocation, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/user.slice";
import { useEffect } from "react";
import { LoaderCircle } from "lucide-react";
import FormInput from "../components/FormInput";
import FormButton from "../components/FormButton";
import FormLink from "../components/FormLink";

const LoginPage = () => {
  const { state } = useLocation();
  const {
    loading,
    data: {
      user: { _id },
    },
  } = useSelector((state) => state.user);
  const {
    data: { cart },
  } = useSelector((state) => state.cart);
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

  const validate = () => {
    const err = {
      password: "",
      email: "",
    };

    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!formData.password.length) {
      err.password = "Please enter your password!";
    }
    if (!pattern.test(formData.email)) {
      err.email = "Please enter a valid Email ID!";
    }

    setFormErrors({ ...err });

    return !err.password && !err.email;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) dispatch(login({ ...formData, cart }));
  };

  useEffect(() => {
    if (_id) {
      state ? navigate(state.previousURL) : navigate("/account");
    }
  }, [_id]);

  useEffect(() => {
    document.title = "Primart - Login";
  }, []);
  return (
    <section className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="container flex justify-center items-center h-full">
        <div className="flex flex-col justify-center items-center bg-white w-fit min-w-[400px] py-8 px-4 rounded-sm shadow-md">
          <h1 className="heading-2 text-xl mb-3.5">Login</h1>
          <p className="body-text mb-7">We are so excited to see you!</p>
          <form onSubmit={handleSubmit} className="flex flex-col w-full gap-4">
            <FormInput
              type="email"
              name="email"
              cls="form-input"
              value={formData.email}
              handleChange={handleChange}
              error={formErrors.email}
              title='email'
            />
            <FormInput
              type="password"
              name="password"
              cls="form-input"
              value={formData.password}
              handleChange={handleChange}
              error={formErrors.password}
              title='password'
            />
            <Link
              to="/password/forget"
              className="body-text text-blue-500 underline text-right"
            >
              Forget Password
            </Link>
            <FormButton loading={loading} value="Login" />
            <FormLink
              text="Don't have an account?"
              value="Sign up"
              link="/signup"
            />
          </form>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
