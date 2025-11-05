import React, { useRef } from "react";
import ProductCard from "./ProductCard";
import { useSelector } from "react-redux";
import Skeleton from "./Skeleton";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ProductSlider = ({ title, products }) => {
  const { loading } = useSelector((state) => state.product);
  let sliderRef = useRef(null);

  const slideLeft = () => {
    sliderRef.slickPrev();
  };
  const slideRight = () => {
    sliderRef.slickNext();
  };

  var settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
    ],
  };

  return (
    <section>
      <div className="container flex flex-col w-full">
        <div className="flex justify-between items-center">
          <h1 className="heading-2 text-xl md:text-2xl">{title}</h1>
          <div className="flex gap-2">
            <button className="button-3 sm:text-black" onClick={slideLeft}>
              {"<"}
            </button>
            <button className="button-3" onClick={slideRight}>
              {">"}
            </button>
          </div>
        </div>
        <div className="mt-5">
          {!loading ? (
            <Slider
              ref={(slider) => {
                sliderRef = slider;
              }}
              {...settings}
            >
              {products?.map((product) => {
                return <ProductCard {...product} key={product?._id} />;
              })}
            </Slider>
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
