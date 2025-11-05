import React, { useRef, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  Menu,
  Heart,
  ShoppingCart,
  User,
  LogOut,
  LayoutDashboard,
  UserRound,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/user.slice";
import { useEffect } from "react";
import image from "/assets/category/img1.jpg";

const Navbar = ({ cartOpen, setCartOpen }) => {
  const [toggle, setToggle] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const ref = useRef(0);

  const {
    data: {
      user: { _id, name, role },
    },
  } = useSelector((state) => state.user);
  const {
    data: { cart },
  } = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  const handleClickOutside = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      setToggle(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    setCartOpen(false);
    setToggle(false);
  }, [pathname]);

  useEffect(() => {
    cartOpen
      ? document.body.classList.add("overflow-hidden")
      : document.body.classList.remove("overflow-hidden");
  }, [cartOpen]);

  useEffect(() => {
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);
  return (
    <nav
      className="w-full fixed top-0 left-0  z-50 bg-white shadow-xl"
      ref={ref}
    >
      <div className="container relative flex items-center bg-white h-16 gap-6">
        <Link to="/" className="text-2xl md:text-4xl">
          Primart<span className="text-red-500">.</span>
        </Link>
        <div className="md:hidden w-full">
          <Menu
            onClick={() => setToggle((prev) => !prev)}
            className="cursor-pointer"
          />
        </div>
        {/* className={`navbar-collapse ${toggle ? "" : "collapse"}`} */}
        <div
          className={`${
            toggle ? "top-16" : "-top-16"
          } absolute w-full bg-white left-0 -z-10 transition-all md:relative md:top-0 md:z-0`}
        >
          <ul className="flex flex-col md:items-center md:flex-row">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "active-nav-link nav-link" : "nav-link"
                }
                onClick={() => setToggle(false)}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/browse"
                className={({ isActive }) =>
                  isActive ? "active-nav-link nav-link" : "nav-link"
                }
                onClick={() => setToggle(false)}
              >
                Browse
              </NavLink>
            </li>
          </ul>
        </div>
        <ul className="flex items-center">
          <li>
            <Heart onClick={() => navigate("/wishlist")} />
          </li>
          <li onClick={() => setCartOpen(true)}>
            <ShoppingCart />
            {cart?.length ? (
              <div className="absolute -top-2.5 -right-2.5 bg-red-500 text-white text-center text-xs w-5 h-5 p-0.5 rounded-full">
                {cart?.length}
              </div>
            ) : (
              <></>
            )}
          </li>
          <li>
            {!_id ? (
              <Link to="/login">
                <User />
              </Link>
            ) : (
              <div
                className="relative"
                onMouseOver={() => setOpen(true)}
                onMouseOut={() => setOpen(false)}
              >
                <div className="w-5 h-5 rounded-full bg-white overflow-hidden cursor-pointer">
                  <img
                    src='https://res.cloudinary.com/dukfglghw/image/upload/v1760549214/user_pzbqyz.png'
                    alt={name}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <ul
                  className={`${
                    open ? "visible opacity-100" : "invisible opacity-0"
                  } absolute top-3 -right-3.5 flex flex-col items-center pt-7 transition-opacity duration-300 ease-in-out`}
                >
                  <li
                    onClick={() => [setOpen(false), navigate("/account/profile")]}
                    className="flex items-center capitalize justify-center bg-white rounded-full shadow-card p-2 hover:bg-gray-200"
                  >
                    <User className="w-4 h-4" />
                  </li>
                  {role === "admin" && (
                    <li
                      onClick={() => [setOpen(false), navigate("/dashboard")]}
                      className="flex items-center justify-center bg-white rounded-full shadow-card p-2 hover:bg-gray-200"
                    >
                      <LayoutDashboard className="w-4 h-4" />
                    </li>
                  )}
                  <li
                    onClick={() => [setOpen(false), dispatch(logout())]}
                    className="flex items-center justify-center bg-white rounded-full shadow-card p-2 hover:bg-gray-200"
                  >
                    <LogOut className="w-4 h-4" />
                  </li>
                </ul>
              </div>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
