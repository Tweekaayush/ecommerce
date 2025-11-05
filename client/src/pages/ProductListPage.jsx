import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getProductsList } from "../features/admin.slice";
import { useState } from "react";
import { Trash, SquareArrowOutUpRight } from "lucide-react";
import Pagination from "../components/Pagination";
import { deleteProduct } from "../features/product.slice";
import Skeleton from "../components/Skeleton";

const ProductListPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    loading,
    data: { productList, totalPages },
  } = useSelector((state) => state.admin);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getProductsList(page));
  }, [page]);
  useEffect(()=>{
      document.title = 'Admin - Products List'
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
          Product List
        </h1>
        <div className="flex flex-col">
          <div className="grid grid-cols-[3fr_2fr_2fr_2fr_1fr_1fr_1fr] gap-4 mb-8 text-center pb-2 border-b border-gray-200">
            <span className="list-head">ID</span>
            <span className="list-head">Name</span>
            <span className="list-head">brand</span>
            <span className="list-head">category</span>
            <span className="list-head">price</span>
          </div>
          <div className="flex flex-col">
            {!loading
              ? productList?.map((product) => {
                  return (
                    <div
                      key={product?._id}
                      className="grid grid-cols-[3fr_2fr_2fr_2fr_1fr_1fr_1fr] gap-4 px-2 items-center text-center py-7 bg-white even:bg-gray-100 even:hover:bg-gray-200 hover:bg-gray-200 cursor-pointer transition-all duration-300 ease-in-out"
                    >
                      <p className="list-body ellipses">{product?._id}</p>
                      <p className="list-body ellipses"> {product?.name}</p>
                      <p className="list-body ellipses">{product?.brand}</p>
                      <p className="list-body ellipses">{product?.category}</p>
                      <div className="flex justify-center list-body">
                        <span className="text-xs">$</span>
                        <p>{product?.price}</p>
                      </div>
                      <SquareArrowOutUpRight
                        className="w-4 h-4 mx-auto"
                        onClick={() =>
                          navigate(`/dashboard/product/update/${product?._id}`)
                        }
                      />
                      <Trash
                        className="w-4 h-4 text-red-500 mx-auto"
                        onClick={() =>
                          dispatch(
                            deleteProduct({ id: product?._id, page: page })
                          )
                        }
                      />
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

export default ProductListPage;
