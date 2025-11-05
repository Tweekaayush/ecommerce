import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getUsersList } from "../features/admin.slice";
import { useState } from "react";
import { Trash } from "lucide-react";
import Pagination from "../components/Pagination";
import Skeleton from "../components/Skeleton";

const UserListPage = () => {
  const dispatch = useDispatch();
  const {
    loading,
    data: { userList, totalPages },
  } = useSelector((state) => state.admin);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getUsersList(page));
  }, [page]);

  useEffect(()=>{
    document.title = 'Admin - Users List'
  }, [])

  return (
    <section className="min-h-screen">
      <div className="container">
        <Link
          to="/dashboard"
          className="heading-1 text-xs md:text-sm hover:underline text-gray-500 mb-4"
        >
          DASHBOARD/
        </Link>
        <h1 className="heading-1 text-xl text-red-500 uppercase mb-7">
          User List
        </h1>
        <div className="flex flex-col">
          <div className="grid grid-cols-[4fr_2fr_3fr_2fr_1fr] gap-4 mb-8 text-center pb-2 border-b border-gray-200">
            <span className="list-head">ID</span>
            <span className="list-head">Name</span>
            <span className="list-head">email</span>
            <span className="list-head">admin</span>
          </div>
          <div className="flex flex-col">
            {!loading
              ? userList?.map((user) => {
                  return (
                    <div
                      key={user._id}
                      className="grid grid-cols-[4fr_2fr_3fr_2fr_1fr] gap-4 items-center px-2 text-center py-7 bg-white even:bg-gray-100 even:hover:bg-gray-200 hover:bg-gray-200 cursor-pointer transition-all duration-300 ease-in-out"
                    >
                      <p className="list-body ellipses">{user?._id}</p>
                      <p className="list-body ellipses"> {user?.name}</p>
                      <p className="list-body ellipses">{user?.email}</p>
                      <p className="list-body ellipses">{user?.role}</p>
                      <Trash className="w-4 h-4 text-red-500 mx-auto" />
                    </div>
                  );
                })
              : new Array(6).fill(0).map((_, i) => {
                  return <Skeleton key={i} classname="w-full h-20 mb-2" />;
                })}
          </div>
        </div>
        <Pagination page={page} setPage={setPage} totalPages={totalPages} />
      </div>
    </section>
  );
};

export default UserListPage;
