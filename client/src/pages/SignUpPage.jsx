import { Link, useLocation, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { signup } from "../slices/user.slice";
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

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signup({ ...formData }));
  };

  useEffect(() => {
    if (_id) {
      state ? navigate(state.previousURL) : navigate("/profile");
    }
  }, [_id]);
  return (
    <section className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="container flex justify-center items-center h-full">
        <div className="flex flex-col justify-center items-center bg-white w-fit min-w-[400px] py-8 px-4 rounded-sm shadow-md">
          <h1 className="heading-2 mb-3.5">Sign Up</h1>
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
              {formErrors.name && <p className="form-error-msg"> error </p>}
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
              {formErrors.email && <p className="form-error-msg"> error </p>}
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
              {formErrors.password && <p className="form-error-msg"> error </p>}
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
                <p className="form-error-msg"> error </p>
              )}
            </label>
            <button type="submit" className="button-2" disabled={true}>
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
