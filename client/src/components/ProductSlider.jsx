import React from "react";
import ProductCard from "./ProductCard";
import { useSelector } from "react-redux";
import Skeleton from "./Skeleton";

const ProductSlider = ({ title, products }) => {
  const { loading } = useSelector((state) => state.product);

  const slideLeft = () => {
    let slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft - slider.offsetWidth - 16;
  };
  const slideRight = () => {
    let slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft + slider.offsetWidth + 16;
  };

  return (
    <section>
      <div className="container flex flex-col w-full">
        <div className="flex justify-between items-center">
          <h1 className="heading-2 text-2xl">{title}</h1>
          <div className="flex gap-2">
            <button className="button-3" onClick={slideLeft}>
              {"<"}
            </button>
            <button className="button-3" onClick={slideRight}>
              {">"}
            </button>
          </div>
        </div>
        <div
          className="overflow-x-hidden py-5 scroll-smooth w-full"
          id="slider"
        >
          {!loading ? (
            <div className="flex gap-4 w-fit px-1">
              {products?.map((product) => {
                return (
                  <ProductCard {...product} key={product?._id} slider={true} />
                );
              })}
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-4">
              {new Array(4).fill(0).map((_, i) => {
                return <Skeleton key={i} classname="w-full h-96" />;
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductSlider;
