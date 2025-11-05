import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LoaderCircle } from "lucide-react";
import { resetPassword } from "../features/user.slice";

const ResetPasswordPage = () => {
  const { state, search } = useLocation();
  const token = new URLSearchParams(search).get("token");
  const user = new URLSearchParams(search).get("user");
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [formErrors, setFormErrors] = useState({
    password: "",
    confirmPassword: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    loading,
    data: {
      user: { _id },
    },
    successMessage,
    error,
  } = useSelector((state) => state.user);

  const validate = () => {
    let error = {
      password: "",
      confirmPassword: "",
    };

    if (formData.password === "") {
      error.password = "Please enter a new password";
    }

    if (formData.password !== formData.confirmPassword) {
      error.confirmPassword = "Password does not match";
    }

    setFormErrors(error);
    return error.password === "" && error.confirmPassword === "";
  };

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
    if (validate())
      dispatch(resetPassword({ password: formData.password, user, token }));
  };

  useEffect(() => {
    if (_id) {
      state ? navigate(state.previousURL) : navigate("/profile");
    }
  }, [_id]);

  useEffect(() => {
    if (successMessage) {
      navigate("/login");
    }
  }, [successMessage]);

  useEffect(() => {
    document.title = "Primart - Reset Password";
  }, []);

  return (
    <section className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="container flex justify-center items-center h-full">
        <div className="flex flex-col justify-center items-center bg-white w-fit min-w-[400px] py-8 px-4 rounded-sm shadow-md">
          <h1 className="heading-2 text-xl mb-3.5">Reset Password</h1>
          <p className="body-text mb-7">Make a new password.</p>
          <form onSubmit={handleSubmit} className="flex flex-col w-full gap-4">
            <label htmlFor="email" className="form-label">
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
                <p className="form-error-msg">{formErrors.password}</p>
              )}
            </label>
            <label htmlFor="password" className="form-label">
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="form-input"
              />
              <span>confirmPassword</span>
              {formErrors.confirmPassword && (
                <p className="form-error-msg">{formErrors.confirmPassword}</p>
              )}
            </label>
            <button className="button-2" disabled={loading}>
              {loading ? (
                <LoaderCircle className="mx-auto animate-spin" />
              ) : (
                "Reset"
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ResetPasswordPage;
