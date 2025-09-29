import { useEffect } from "react";
import Hero from "../components/Hero";
import HomeCategories from "../components/HomeCategories";
import ProductSlider from "../components/ProductSlider";
import PromotionBanner from "../components/PromotionBanner";
import { useDispatch, useSelector } from "react-redux";
import { getBestSellingProducts, getFeaturedProducts } from "../slices/product.slice";
import ProductCard from "../components/ProductCard";

const HomePage = () => {
  const dispatch = useDispatch();
  const {
    data: { featuredProducts, bestSellingProducts },
  } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getFeaturedProducts());
    dispatch(getBestSellingProducts())
  }, []);
  return (
    <>
      <Hero />
      <ProductSlider title={"Featured"} products={featuredProducts} />
      <HomeCategories />
      <PromotionBanner />
      <section>
        <div className="container flex flex-col items-center">
          <h1 className="heading-2 mb-7">Best Sellers</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {
              bestSellingProducts.map((product)=>{
                return <ProductCard key={product._id} {...product}/>
              })
            }
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
