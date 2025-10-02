import React, { useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  Menu,
  Heart,
  ShoppingCart,
  User,
  LogOut,
  LayoutDashboard,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../slices/user.slice";
import { useEffect } from "react";

const Navbar = ({ cartOpen, setCartOpen }) => {
  const [toggle, setToggle] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const {
    data: {
      user: { _id, name, image, role },
    },
  } = useSelector((state) => state.user);
  const {
    data: { cart },
  } = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
    setCartOpen(false)
  }, [pathname]);

  useEffect(() => {
    cartOpen
      ? document.body.classList.add("overflow-hidden")
      : document.body.classList.remove("overflow-hidden");
  }, [cartOpen]);

  return (
    <nav className="w-full fixed top-0 left-0  z-50 bg-white shadow-xl">
      <div className="container relative flex items-center bg-white h-16 gap-6">
        <Link to="/" className="text-4xl">
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
            toggle ? "top-16" : "top-0"
          } absolute w-full bg-white left-0 -z-10 transition-all md:relative md:top-0 md:z-0`}
        >
          <ul className="flex items-center">
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
            <Heart />
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
                <div className="w-5 h-5 rounded-full bg-red-500 overflow-hidden cursor-pointer">
                  <img
                    src={image}
                    alt={name}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <ul
                  className={`${
                    open ? "visible opacity-100" : "invisible opacity-0"
                  } absolute top-5 -right-3.5 flex flex-col items-center pt-7 transition-opacity duration-300 ease-in-out`}
                >
                  <li
                    onClick={() => navigate("/profile")}
                    className="flex items-center capitalize justify-center gap-1 bg-white rounded-full shadow-card p-2 hover:bg-gray-200"
                  >
                    <User className="w-4 h-4" />
                  </li>
                  {role === "admin" && (
                    <li
                      onClick={() => navigate("/dashboard")}
                      className="flex items-center justify-center gap-1 bg-white rounded-full shadow-card p-2 hover:bg-gray-200"
                    >
                      <LayoutDashboard className="w-4 h-4" />
                    </li>
                  )}
                  <li
                    onClick={() => dispatch(logout())}
                    className="flex items-center justify-center gap-1 bg-white rounded-full shadow-card p-2 hover:bg-gray-200"
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
