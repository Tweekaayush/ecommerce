import ProductCard from "../components/ProductCard";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories, getProducts } from "../slices/product.slice";
import { useNavigate } from "react-router-dom";

const BrowsePage = () => {
  const {
    data: { categories, products },
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
    document.title = `Browse ${activeCategory}`;
  }, [page, activeCategory]);

  useEffect(() => {
    dispatch(getAllCategories());
  }, []);
  return (
    <section>
      <div className="container min-h-screen">
        <div className="flex flex-col bg-gray-100 p-4">
          <h1 className="heading-1 mb-4">Categories</h1>
          <div className="flex flex-wrap gap-4 mb-4">
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
          </div>
        </div>
        <div className="grid grid-cols-4 py-4 gap-4">
          {products?.map((product) => {
            return <ProductCard {...product} key={product?._id} slider={false} />;
          })}
        </div>
      </div>
    </section>
  );
};

export default BrowsePage;
