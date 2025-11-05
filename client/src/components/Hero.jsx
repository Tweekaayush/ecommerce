import React from "react";
import backgroundImage from "/assets/hero/hero6.jpg";
const Hero = () => {
  return (
    <section
      style={{ backgroundImage: `url(${backgroundImage})` }}
      className="bg-center bg-cover h-[65vh] bg-gray-100"
    >
      <div className="container h-full grid grid-cols-[1fr] md:grid-cols-[1fr_1fr] items-center">
        <div className="flex flex-col items-start">
          <h1 className="heading-1 text-red-500 text-sm mb-3.5">Technology</h1>
          <h1 className="heading-3 mb-7">for your convenience</h1>
          <p className="body-text text-gray-800 mb-7">
            Shop for electronic products with the latest technology,
            sophisticated design, guranteed quality and fast delivery to the
            destination.
          </p>
          <button className="button-1">shop now</button>
        </div>
        <div className=""></div>
      </div>
    </section>
  );
};

export default Hero;
