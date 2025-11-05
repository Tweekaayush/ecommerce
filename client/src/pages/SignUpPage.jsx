import { Link, useLocation, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { signup } from "../features/user.slice";
import { useDispatch, useSelector } from "react-redux";
import { LoaderCircle } from "lucide-react";

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
      state ? navigate(state.previousURL) : navigate("/profile");
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
            <label htmlFor="" className="form-label">
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                className="form-input"
              />
              <span>Name</span>
              {formErrors.name && (
                <p className="form-error-msg"> {formErrors.name} </p>
              )}
            </label>
            <label htmlFor="" className="form-label">
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="form-input"
              />
              <span>email</span>
              {formErrors.email && (
                <p className="form-error-msg"> {formErrors.email} </p>
              )}
            </label>
            <label htmlFor="" className="form-label">
              <input
                type="password"
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                className="form-input"
              />
              <span>password</span>
              {formErrors.password && (
                <p className="form-error-msg"> {formErrors.password} </p>
              )}
            </label>
            <label htmlFor="" className="form-label">
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="form-input"
              />
              <span>confirm password</span>
              {formErrors.confirmPassword && (
                <p className="form-error-msg"> {formErrors.confirmPassword} </p>
              )}
            </label>
            <button type="submit" className="button-2" disabled={loading}>
              {loading ? (
                <LoaderCircle className="mx-auto animate-spin" />
              ) : (
                "Register"
              )}
            </button>
            <p className="body-text">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-500">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignUpPage;
