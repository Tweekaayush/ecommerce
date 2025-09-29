import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Layout from "./components/Layout/Layout";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProductPage from "./pages/ProductPage";
import BrowsePage from "./pages/BrowsePage";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./slices/user.slice";

const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(loadUser());
  }, []);

  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/browse" element={<BrowsePage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/dashboard" element={<HomePage />} />
          <Route path="/profile" element={<HomePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
