import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, Heart, ShoppingCart, User } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../slices/user.slice";

const Navbar = ({setCartOpen}) => {
  const [toggle, setToggle] = useState(false);
  const [open, setOpen] = useState(false);

  const {
    data: {
      user: { _id },
    },
  } = useSelector((state) => state.user);

  const dispatch = useDispatch()

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
          <li onClick={()=>setCartOpen(true)}>
            <ShoppingCart />
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
                    src=""
                    alt=""
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <ul
                  className={`${
                    open ? "visible opacity-100" : "invisible opacity-0"
                  } absolute top-5 -right-2 flex flex-col items-center pt-7 transition-opacity duration-300 ease-in-out`}
                >
                  <li className="rounded-full bg-white w-5 h-5 items-center justify-center shadow-2xl">
                    <Link to="/">
                      <User className="w-4 h-4" />
                    </Link>
                  </li>
                  <li onClick={()=>dispatch(logout())} className="rounded-full bg-white w-5 h-5 items-center justify-center shadow-2xl">
                    <User className="w-4 h-4" />
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
