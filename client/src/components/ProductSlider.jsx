import React from "react";
import ProductCard from "./ProductCard";

const ProductSlider = ({ title, products }) => {
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
          <h1 className="heading-2">{title}</h1>
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
          <div className="flex gap-4 w-fit">
            {products?.map((product) => {
              return (
                <ProductCard {...product} key={product?._id} slider={true} />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductSlider;
