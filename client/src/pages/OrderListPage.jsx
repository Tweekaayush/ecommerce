import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getOrdersList } from "../features/admin.slice";
import { useState } from "react";
import { Trash } from "lucide-react";
import Pagination from "../components/Pagination";
import Skeleton from "../components/Skeleton";

const OrderListPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    loading,
    data: { orderList, totalPages },
  } = useSelector((state) => state.admin);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getOrdersList(page));
  }, [page]);

  useEffect(()=>{
      document.title = 'Admin - Orders List'
    }, [])
  return (
    <section className="min-h-screen">
      <div className="container">
        <Link
          to="/dashboard"
          className="heading-1 text-xs md:text-sm hover:underline text-gray-500 mb-4"
        >
          DASHBOARD /
        </Link>
        <h1 className="heading-1 text-xl text-red-500 uppercase mb-7">
          Order List
        </h1>
        <div className="flex flex-col">
          <div className="grid grid-cols-[4fr_2fr_2fr_4fr] gap-4 mb-8 text-center pb-2 border-b-1 border-gray-200">
            <span className="list-head">ID</span>
            <span className="list-head">Status</span>
            <span className="list-head">Amount</span>
            <span className="list-head">Placed On</span>
          </div>
          <div className="flex flex-col">
            {!loading
              ? orderList?.map((order) => {
                  return (
                    <div
                      key={order?._id}
                      onClick={() => navigate(`/order/${order?._id}`)}
                      className="grid grid-cols-[4fr_2fr_2fr_4fr] gap-4 items-center text-center py-7 px-2 bg-white nth-[odd]:bg-gray-100 nth-[odd]:hover:bg-gray-200 hover:bg-gray-200 cursor-pointer transition-all duration-300 ease-in-out"
                    >
                      <p className="list-body ellipses">{order?._id}</p>
                      <p className="list-body capitalize ellipses">
                        {" "}
                        {order?.orderStatus}
                      </p>
                      <div className="flex justify-center list-body">
                        <span className="text-xs">$</span>
                        <p>{order?.totalAmount}</p>
                      </div>
                      <p className="list-body ellipses">
                        {order?.createdAt.split("T")[0]}
                      </p>
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

export default OrderListPage;
