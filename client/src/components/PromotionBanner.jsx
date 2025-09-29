import React from "react";
import backgroundImage from "/assets/promotion/promotion1.jpg";
const PromotionBanner = () => {
  return (
    <section
      style={{ backgroundImage: `url(${backgroundImage})`}}
      className="bg-[30%_80%] bg-cover bg-no-repeat h-[55vh] bg-gray-100"
    >
      <div className="container grid grid-cols-12 items-center">
        <div className="col-span-6"></div>
        <div className="col-span-6 flex flex-col items-start">
          <div className="heading-1 mb-3.5">Minimalist Decor</div>
          <div className="heading-3 mb-7">that suits every style</div>
          <p className="body-text mb-7">
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
