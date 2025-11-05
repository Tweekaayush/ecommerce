import { Link, useLocation, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { signup } from "../features/user.slice";
import { useDispatch, useSelector } from "react-redux";
import { LoaderCircle } from "lucide-react";
import FormButton from "../components/FormButton";
import FormLink from "../components/FormLink";
import FormInput from "../components/FormInput";

const SignUpPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
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
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    image: "",
  });
  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const dispatch = useDispatch();

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
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    };

    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!formData.name.length) {
      err.firstName = "Please provide your Name!";
    }
    if (!formData.password.length) {
      err.password = "Please enter your password!";
    } else if (formData.password.length < 6) {
      err.password = "Your password should be atleast 6 characters long!";
    }
    if (formData.password !== formData.confirmPassword) {
      err.confirmPassword = "Password does not match!";
    }
    if (!pattern.test(formData.email)) {
      err.email = "Please enter a valid Email ID!";
    }

    setFormErrors({ ...err });

    return !err.password && !err.email && !err.name && !err.confirmPassword;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) dispatch(signup({ ...formData, cart }));
  };

  useEffect(() => {
    if (_id) {
      state ? navigate(state.previousURL) : navigate("/account");
    }
  }, [_id]);

  useEffect(() => {
    document.title = "Primart - Signup";
  }, []);

  return (
    <section className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="container flex justify-center items-center h-full">
        <div className="flex flex-col justify-center items-center bg-white w-fit min-w-[400px] py-8 px-4 rounded-sm shadow-md">
          <h1 className="heading-2 text-2xl mb-3.5">Sign Up</h1>
          <p className="body-text mb-7">Start your journey with us</p>
          <form onSubmit={handleSubmit} className="flex flex-col w-full gap-4">
            <FormInput
              type="text"
              name="name"
              cls="form-input"
              value={formData.name}
              handleChange={handleChange}
              error={formErrors.name}
              title='name'
            />
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
            <FormInput
              type="password"
              name="confirmPassword"
              cls="form-input"
              value={formData.confirmPassword}
              handleChange={handleChange}
              error={formErrors.confirmPassword}
              title='confirm password'
            />
            <FormButton loading={loading} value="Register" />
            <FormLink
              text="Already have an account?"
              value="Login"
              link="/login"
            />
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignUpPage;
