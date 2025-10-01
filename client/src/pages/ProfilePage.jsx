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

import { logout } from "../slices/user.slice";

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
    // dispatch(updateUserProfile(formData));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="flex flex-col">
      <h1 className="heading-1 mb-7">Privacy</h1>
      <form className="flex flex-col w-full gap-4" onSubmit={handleSubmit}>
        <label htmlFor="name" className="form-label">
          <input
            className="form-input"
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
            className="form-input"
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
            className="form-input"
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
  return <div> Orders</div>;
};

const UpdateAddress = () => {
  const dispatch = useDispatch();
  // const updateForm = (data) => {
  //   console.log(data);
  //   dispatch(updateUserProfile({ fullAddress: { ...data } }));
  // };
  return (
    <div className="">
      <h1 className="">Address</h1>
      <div className="">
        {/* <AddressForm submitFunction={updateForm} /> */}
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
    <div className="">
      <h1 className="">Account</h1>
      <div className="">
        <div className="">
          <h5 className="">Name</h5>
          <p className="3">{name}</p>
        </div>
        <div className="">
          <h5 className="">Email</h5>
          <p className=""> {email}</p>
        </div>
        <div className="">
          <h5 className="">Address</h5>
          <p className="">
            {fullAddress?.address && (
              <>
                {fullAddress?.address}, {fullAddress?.postalCode}
                <br />
                {fullAddress?.city}, {fullAddress?.country}
              </>
            )}
          </p>
        </div>
        <div className="">
          <h5 className="">Joined On</h5>
          <p className="">{createdAt.substring(0, 10)}</p>
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
    <section className="min-h-screen">
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
        <div className="col-span-9 p-4 shadow-xl h-[500px] rounded-sm">
          <ActiveComponent />
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
