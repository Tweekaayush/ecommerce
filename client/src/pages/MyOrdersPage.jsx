import React, { useEffect, useState } from "react";
import { getMyOrders } from "../features/order.slice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Skeleton from "../components/Skeleton";
import Pagination from "../components/Pagination";

const MyOrdersPage = () => {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    loading,
    data: { orderList, totalPages },
  } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(getMyOrders(page));
  }, []);
  return (
    <div className="flex flex-col">
      <h1 className="heading-1 text-red-500 text-sm md:text-base mb-12.5">My Orders</h1>
      <div className="flex-1">
        <div className="grid grid-cols-[5fr_2fr_2fr_3fr] gap-4 mb-8 text-center pb-2 border-b border-gray-200">
          <span className="list-head">ID</span>
          <span className="list-head">status</span>
          <span className="list-head">total</span>
          <span className="list-head">Placed On</span>
        </div>
        {!loading ? (
          <div className="flex flex-col">
            {orderList?.map((order, i) => {
              return (
                <div
                  key={order?._id}
                  className="grid grid-cols-[5fr_2fr_2fr_3fr] gap-4 items-center text-center py-7 px-2 bg-white odd:bg-gray-100 even:hover:bg-gray-200 hover:bg-gray-200 cursor-pointer transition-all duration-300 ease-in-out"
                  onClick={() => navigate(`/order/${order?._id}`)}
                >
                  <p className="list-body ellipses">{order?._id}</p>
                  <p className="list-body capitalize ellipses">
                    {order?.orderStatus}
                  </p>
                  <div className="flex justify-center">
                    <span className="text-xs mt-0.5">$</span>
                    <p classname="text-sm ellipses">{order?.totalAmount}</p>
                  </div>
                  <p className="list-body ellipses">
                    {order?.createdAt.split("T")[0]}
                  </p>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {new Array(4).fill(0).map((_, i) => {
              return <Skeleton key={i} classname="w-full h-16" />;
            })}
          </div>
        )}
      </div>
      <Pagination page={page} totalPages={totalPages} setPage={setPage} />
    </div>
  );
};

export default MyOrdersPage;
