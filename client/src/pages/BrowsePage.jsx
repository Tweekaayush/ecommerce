import ProductCard from "../components/ProductCard";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories, getProducts } from "../features/product.slice";
import { useNavigate } from "react-router-dom";
import Pagination from "../components/Pagination";
import Skeleton from "../components/Skeleton";

const BrowsePage = () => {
  const {
    loading,
    data: { categories, products, totalPages },
  } = useSelector((state) => state.product);
  const cat = new URLSearchParams(location.search).get("category");
  const [activeCategory, setActiveCategory] = useState(cat || "");
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setActiveCategory(cat || "");
    setPage(1);
  }, [cat]);

  useEffect(() => {
    dispatch(getProducts({ page: page, category: activeCategory }));
    document.title = `Browse ${activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)}`;
    window.scrollTo(0, 0);
  }, [page, activeCategory]);

  useEffect(() => {
    dispatch(getAllCategories());
  }, []);
  return (
    <section className="min-h-screen">
      <div className="container min-h-screen">
        <div className="flex flex-col bg-gray-100 p-4 mb-8">
          <h1 className="heading-1 text-red-500 text-sm mb-4">Categories</h1>
          <div className="flex flex-wrap gap-4 mb-4">
            {!loading ? (
              <>
                <span
                  onClick={() => navigate(`/browse`)}
                  className={`${
                    activeCategory === ""
                      ? "text-black border-black"
                      : "border-gray-400 text-gray-500"
                  } capitalize border-2 px-4 py-1 text-sm cursor-pointer`}
                >
                  all
                </span>
                {categories?.map((category) => {
                  return (
                    <span
                      key={category}
                      onClick={() => navigate(`/browse?category=${category}`)}
                      className={`${
                        activeCategory === category
                          ? "text-black border-black"
                          : "border-gray-400 text-gray-500"
                      } capitalize border-2 px-4 py-1 text-sm cursor-pointer`}
                    >
                      {category}
                    </span>
                  );
                })}
              </>
            ) : (
              new Array(8).fill(0).map((_, i) => {
                return <Skeleton key={i} classname="w-16 h-8" />;
              })
            )}
          </div>
        </div>
        <div className="min-h-[872px]">
          <div className="py-4 grid grid-cols-[1fr_1fr] sm:grid-cols-[1fr_1fr_1fr] lg:grid-cols-[1fr_1fr_1fr_1fr] gap-4 h-fit">
            {!loading
              ? products?.map((product) => {
                  return (
                    <ProductCard
                      {...product}
                      key={product?._id}
                      slider={false}
                    />
                  );
                })
              : new Array(4).fill(0).map((_, i) => {
                  return <Skeleton key={i} classname="w-full h-96" />;
                })}
          </div>
        </div>
        <Pagination totalPages={totalPages} page={page} setPage={setPage} />
      </div>
    </section>
  );
};

export default BrowsePage;
