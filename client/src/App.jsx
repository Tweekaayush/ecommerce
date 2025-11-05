import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";

const App = () => {
  return (
    <Suspense fallback={<></>}>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<HomePage/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/signup" element={<SignUpPage/>} />
          <Route path="/password/forget" element={<ForgotPasswordPage />} />
            <Route path="/password/reset" element={<ResetPasswordPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;
