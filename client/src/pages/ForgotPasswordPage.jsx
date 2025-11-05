import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { forgetPassword } from "../features/user.slice";
import { LoaderCircle } from "lucide-react";


const ForgotPasswordPage = () => {
  const { state } = useLocation();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    loading,
    data: {
      user: { _id },
    },
    error,
  } = useSelector((state) => state.user);

  const validate = () => {
    let error = "";
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!pattern.test(email)) {
      error = "enter a valid email";
    }

    setEmailError(error);
    return error === "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) dispatch(forgetPassword({ email }));
  };

  useEffect(() => {
    if (_id) {
      state ? navigate(state.previousURL) : navigate("/profile");
    }
  }, [_id]);

  useEffect(() => {
    document.title = "Primart - Forget Password";
  }, []);

  return (
    <section className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="container flex justify-center items-center h-full">
        <div className="flex flex-col justify-center items-center bg-white w-fit min-w-[400px] py-8 px-4 rounded-sm shadow-md">
          <h1 className="heading-2 text-xl mb-3.5">Forget Password</h1>
          <p className="body-text mb-7">We'll send you a password reset link.</p>
          <form onSubmit={handleSubmit} className="flex flex-col w-full gap-4">
            <label htmlFor="email" className="form-label">
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"
              />
              <span>email</span>
              {emailError && <p className="form-error-msg">{emailError}</p>}
            </label>
           <button className="button-2" disabled={loading}>
              {loading ? (
                <LoaderCircle className="mx-auto animate-spin" />
              ) : (
                "send password reset link"
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ForgotPasswordPage;
