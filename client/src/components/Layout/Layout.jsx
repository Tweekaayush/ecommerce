import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import Cart from "../Cart";
import { useState } from "react";

const Layout = () => {
  const [cartOpen, setCartOpen] = useState(false);
  return (
    <>
      <Navbar setCartOpen={setCartOpen} />
      <div
        className={`${
          cartOpen ? "block" : "hidden"
        } w-full h-screen fixed top-0 left-0 bg-black z-[99] opacity-50`}
        onClick={() => setCartOpen(false)}
      ></div>
      <Cart cartOpen={cartOpen} setCartOpen={setCartOpen}/>
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
