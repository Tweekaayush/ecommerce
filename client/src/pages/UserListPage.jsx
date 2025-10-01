import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getUsersList } from "../slices/admin.slice";
import { useState } from "react";
import { Trash } from "lucide-react";

const UserListPage = () => {
  const dispatch = useDispatch();
  const {
    data: { userList },
  } = useSelector((state) => state.admin);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getUsersList(page));
  }, [page]);
  return (
    <section>
      <div className="container">
        <Link to="/dashboard" className="heading-5 text-gray-500 mb-4">
          DASHBOARD /
        </Link>
        <h1 className="heading-4 text-red-500 uppercase mb-7">User List</h1>
        <div className="flex flex-col">
          <div className="grid grid-cols-12 gap-4 mb-8 text-center pb-2 border-b-1 border-gray-200">
            <span className="list-head col-span-3">ID</span>
            <span className="list-head col-span-3">Name</span>
            <span className="list-head col-span-3">email</span>
            <span className="list-head col-span-2">admin</span>
            <span className="list-head col-span-1"></span>
          </div>
          <div className="">
            {userList?.map((user) => {
              return (
                <div
                  key={user._id}
                  className="grid grid-cols-12 gap-4 items-center text-center py-7 bg-white nth-[even]:bg-gray-100 nth-[even]:hover:bg-gray-200 hover:bg-gray-200 cursor-pointer transition-all duration-300 ease-in-out"
                >
                  <p className="list-body col-span-3">{user?._id}</p>
                  <p className="list-body col-span-3"> {user?.name}</p>
                  <p className="list-body col-span-3">{user?.email}</p>
                  <p className="list-body col-span-2">{user?.role}</p>
                  <Trash className="w-4 h-4 text-red-500 mx-auto" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserListPage;
