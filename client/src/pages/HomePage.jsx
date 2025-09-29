import { useEffect } from "react";
import Hero from "../components/Hero";
import HomeCategories from "../components/HomeCategories";
import ProductSlider from "../components/ProductSlider";
import PromotionBanner from "../components/PromotionBanner";
import { useDispatch, useSelector } from "react-redux";
import { getFeaturedProducts } from "../slices/product.slice";

const HomePage = () => {
  const dispatch = useDispatch();
  const {
    data: { featuredProducts },
  } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getFeaturedProducts());
  }, []);
  return (
    <>
      <Hero />
      <ProductSlider title={"Featured"} products={featuredProducts} />
      <HomeCategories />
      <PromotionBanner />
      <section></section>
    </>
  );
};

export default HomePage;
