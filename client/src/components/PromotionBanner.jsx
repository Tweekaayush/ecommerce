import React from "react";
import backgroundImage from "/assets/promotion/promotion1.jpg";
const PromotionBanner = () => {
  return (
    <section
      style={{ backgroundImage: `url(${backgroundImage})` }}
      className="bg-position-[30%_80%] bg-cover bg-no-repeat h-[55vh] bg-gray-100"
    >
      <div className="container grid grid-cols-[1fr] md:grid-cols-[1fr_1fr] items-center">
        <div className=""></div>
        <div className="flex flex-col items-start">
          <div className="heading-1 text-red-500 text-sm md:text-base mb-3.5">
            Minimalist Decor
          </div>
          <div className="heading-3 mb-7">that suits every style</div>
          <p className="body-text mb-7 text-gray-700">
            A variety of minimalist-style furniture products with modern and
            contemporary designs.
          </p>
          <div className="button-1">shop now</div>
        </div>
      </div>
    </section>
  );
};

export default PromotionBanner;
