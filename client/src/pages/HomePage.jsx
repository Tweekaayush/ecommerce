import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Hero from "../components/Hero";
import {
  getBestSellingProducts,
  getFeaturedProducts,
} from "../features/product.slice";
import HomeCategories from "../components/HomeCategories";
import ProductSlider from "../components/ProductSlider";
import PromotionBanner from "../components/PromotionBanner";
import ProductCard from "../components/ProductCard";
import Skeleton from "../components/Skeleton";

const HomePage = () => {
  const dispatch = useDispatch();
  const {
    loading,
    data: { featuredProducts, bestSellingProducts },
  } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getFeaturedProducts());
    dispatch(getBestSellingProducts());
    document.title = "Primart - Buy Electronics, Furniture, Skin Care etc.";
  }, []);
  return (
    <>
      <Hero />
      <ProductSlider title={"Featured"} products={featuredProducts} />
      <HomeCategories />
      <PromotionBanner />
      <section>
        <div className="container flex flex-col items-center">
          <h1 className="heading-2 text-xl md:text-2xl mb-7">Best Sellers</h1>
          <div className="grid grid-cols-[1fr_1fr] sm:grid-cols-[1fr_1fr_1fr] lg:grid-cols-[1fr_1fr_1fr_1fr] gap-4 w-full">
            {!loading
              ? bestSellingProducts.map((product) => {
                  return <ProductCard key={product._id} {...product} />;
                })
              : new Array(4).fill(0).map((_, i) => {
                  return <Skeleton key={i} classname="w-full h-96" />;
                })}
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
