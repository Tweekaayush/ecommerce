import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getProductsList } from "../slices/admin.slice";
import { useState } from "react";
import { Trash, SquareArrowOutUpRight } from "lucide-react";
import Pagination from "../components/Pagination";
import { deleteProduct } from "../slices/product.slice";

const ProductListPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    data: { productList, totalPages },
  } = useSelector((state) => state.admin);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getProductsList(page));
  }, [page]);
  return (
    <section className="min-h-screen">
      <div className="container">
        <Link to="/dashboard" className="heading-5 text-gray-500 mb-4">
          DASHBOARD /
        </Link>
        <h1 className="heading-4 text-red-500 uppercase mb-7">Product List</h1>
        <div className="flex flex-col">
          <div className="grid grid-cols-[3fr_2fr_2fr_2fr_1fr_1fr_1fr] gap-4 mb-8 text-center pb-2 border-b-1 border-gray-200">
            <span className="list-head">ID</span>
            <span className="list-head">Name</span>
            <span className="list-head">brand</span>
            <span className="list-head">category</span>
            <span className="list-head">price</span>
          </div>
          <div className="">
            {productList?.map((product) => {
              return (
                <div
                  key={product?._id}
                  className="grid grid-cols-[3fr_2fr_2fr_2fr_1fr_1fr_1fr] gap-4 px-2 items-center text-center py-7 bg-white nth-[even]:bg-gray-100 nth-[even]:hover:bg-gray-200 hover:bg-gray-200 cursor-pointer transition-all duration-300 ease-in-out"
                >
                  <p className="list-body ellipses">{product?._id}</p>
                  <p className="list-body ellipses"> {product?.name}</p>
                  <p className="list-body ellipses">{product?.brand}</p>
                  <p className="list-body ellipses">{product?.category}</p>
                  <p className="list-body ellipses">${product?.price}</p>
                  <SquareArrowOutUpRight
                    className="w-4 h-4 mx-auto"
                    onClick={() =>
                      navigate(`/dashboard/product/update/${product?._id}`)
                    }
                  />
                  <Trash
                    className="w-4 h-4 text-red-500 mx-auto"
                    onClick={() =>
                      dispatch(deleteProduct({ id: product?._id, page: page }))
                    }
                  />
                </div>
              );
            })}
          </div>
        </div>
        <Pagination page={page} setPage={setPage} totalPages={totalPages} />
      </div>
    </section>
  );
};

export default ProductListPage;
