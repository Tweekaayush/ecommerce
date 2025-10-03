import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  User,
  ShoppingCart,
  Lock,
  LayoutDashboard,
  LogOut,
} from "lucide-react";

import { logout, updateProfile } from "../slices/user.slice";
import AddressForm from "../components/AddressForm";
import { getMyOrders } from "../slices/order.slice";
import { Trash } from "lucide-react";
import Pagination from "../components/Pagination";

const UpdateProfile = () => {
  const {
    loading,
    data: {
      user: { name, email },
    },
  } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    name: name,
    email: email,
    password: "",
  });

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfile(formData));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="flex flex-col">
      <h1 className="heading-1 mb-12.5">Privacy</h1>
      <form className="flex flex-col w-full gap-4" onSubmit={handleSubmit}>
        <label htmlFor="name" className="form-label">
          <input
            className="form-input-2"
            type="text"
            name="name"
            id="name"
            onChange={handleChange}
            value={formData.name}
          />
          <span>name</span>
        </label>
        <label htmlFor="email" className="form-label">
          <input
            className="form-input-2"
            type="email"
            name="email"
            id="email"
            onChange={handleChange}
            value={formData.email}
          />
          <span>email</span>
        </label>
        <label htmlFor="password" className="form-label">
          <input
            className="form-input-2"
            type="password"
            name="password"
            id="password"
            onChange={handleChange}
            value={formData.password}
          />
          <span>Update Password</span>
        </label>
        <button type="submit" disabled={loading} className="button-1">
          save Changes
          {/* {loading ? <ImSpinner2 className="fa-spin" /> : "Save Changes"} */}
        </button>
      </form>
    </div>
  );
};

const MyOrders = () => {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    data: { orderList, totalPages },
  } = useSelector((state) => state.order);
  console.log(orderList);
  useEffect(() => {
    dispatch(getMyOrders(page));
  }, []);
  return (
    <div className="flex flex-col">
      <h1 className="heading-1 mb-12.5">My Orders</h1>
      <div className="flex-1">
        <div className="grid grid-cols-12 gap-4 mb-8 text-center pb-2 border-b-1 border-gray-200">
          <span className="list-head col-span-5">ID</span>
          <span className="list-head col-span-2">status</span>
          <span className="list-head col-span-2">total</span>
          <span className="list-head col-span-3">Placed On</span>
        </div>
        <div className="flex flex-col">
          {orderList?.map((order, i) => {
            return (
              <div
                key={order?._id}
                className="grid grid-cols-12 gap-4 items-center text-center py-7 bg-white nth-[odd]:bg-gray-100 nth-[even]:hover:bg-gray-200 hover:bg-gray-200 cursor-pointer transition-all duration-300 ease-in-out"
                onClick={() => navigate(`/order/${order?._id}`)}
              >
                <p className="list-body col-span-5">{order?._id}</p>
                <p className="list-body col-span-2">{order?.orderStatus}</p>
                <p className="list-body col-span-2">${order?.totalAmount}</p>
                <p className="list-body col-span-3">
                  ${order?.createdAt.split("T")[0]}
                </p>
              </div>
            );
          })}
        </div>
      </div>
      <Pagination page={page} totalPages={totalPages} setPage={setPage} />
    </div>
  );
};

const UpdateAddress = () => {
  const dispatch = useDispatch();
  const updateForm = (data) => {
    console.log(data);
    dispatch(updateProfile({ fullAddress: { ...data } }));
  };
  return (
    <div className="flex flex-col">
      <h1 className="heading-1 mb-12.5">Address</h1>
      <div className="">
        <AddressForm submitFunction={updateForm} />
      </div>
    </div>
  );
};

const AccountInfo = () => {
  const {
    loading,
    data: {
      user: { name, image, _id, email, isAdmin, createdAt, fullAddress },
    },
  } = useSelector((state) => state.user);
  return (
    <div className="flex flex-col">
      <h1 className="heading-1 mb-12.5">Account</h1>
      <div className="flex flex-col">
        <div className="grid grid-cols-12 gap-4 p-4">
          <h5 className="heading-5 col-span-2">Name</h5>
          <p className="col-span-10 body-text">{name}</p>
        </div>
        <div className="grid grid-cols-12 gap-4 p-4 bg-gray-100">
          <h5 className="heading-5 col-span-2">Email</h5>
          <p className="col-span-10 body-text"> {email}</p>
        </div>
        <div className="grid grid-cols-12 gap-4 p-4">
          <h5 className="heading-5 col-span-2">Address</h5>
          <p className="col-span-10 body-text">
            {fullAddress?.address && (
              <>
                {fullAddress?.address}, {fullAddress?.postalCode}
                <br />
                {fullAddress?.city}, {fullAddress?.country}
              </>
            )}
          </p>
        </div>
        <div className="grid grid-cols-12 gap-4 p-4 bg-gray-100">
          <h5 className="heading-5 col-span-2">Joined On</h5>
          <p className="col-span-10 body-text">{createdAt.substring(0, 10)}</p>
        </div>
      </div>
    </div>
  );
};

const ProfilePage = () => {
  const {
    loading,
    data: {
      user: { name, image, _id, email, role },
    },
  } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [profileLink, setProfileLink] = useState(0);

  const profileComponents = [
    {
      name: "account",
      component: <AccountInfo />,
      icon: <User />,
    },
    {
      name: "privacy",
      component: <UpdateProfile />,
      icon: <Lock />,
    },
    {
      name: "address",
      component: <UpdateAddress />,
      icon: <Lock />,
    },
    {
      name: "orders",
      component: <MyOrders />,
      icon: <ShoppingCart />,
    },
  ];

  const ActiveComponent = useCallback(
    () => profileComponents[profileLink].component,
    [profileLink]
  );

  useEffect(() => {
    document.title = "Profile";
  }, []);

  return (
    <section className="min-h-screen flex justify-center items-center">
      <div className="container grid grid-cols-12 gap-4">
        <div className="h-fit col-span-3">
          <div className="flex items-center py-8 px-4 w-full gap-2.5">
            <div className="h-14 w-14 rounded-full overflow-hidden">
              <img
                className="w-full h-full object-fit object-[50%_50%]"
                src={image}
                alt={name}
              />
            </div>
            <div className="flex-1">
              <h1 className="heading-5">{name}</h1>
              <p className="body-text text-gray-700">{email}</p>
            </div>
          </div>
          <ul className="w-full h-full flex flex-col items-center overflow-hidden bg-gray-100">
            {profileComponents.map((p, i) => {
              return (
                <li
                  key={p.name}
                  className="flex items-center w-full p-4 border-b last-of-type:border-b-0 border-gray-300 text-sm  gap-4 hover:bg-gray-300 cursor-pointer"
                  onClick={() => setProfileLink(i)}
                >
                  {p.icon}
                  <span className="capitalize">{p.name}</span>
                </li>
              );
            })}
            {role === "admin" && (
              <li
                className="flex items-center w-full p-4 border-b last-of-type:border-b-0 border-gray-300 text-sm  gap-4 hover:bg-gray-300 cursor-pointer"
                onClick={() => navigate("/dashboard")}
              >
                <LayoutDashboard />
                <span className="capitalize">dashboard</span>
              </li>
            )}
            <li
              className="flex items-center w-full p-4 border-b last-of-type:border-b-0 border-gray-300 text-sm  gap-4 hover:bg-gray-300 cursor-pointer"
              onClick={() => dispatch(logout())}
            >
              <LogOut />
              <span className="capitalize">logout</span>
            </li>
          </ul>
        </div>
        <div className="col-span-9 p-4 shadow-card h-[500px] rounded-sm">
          <ActiveComponent />
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
