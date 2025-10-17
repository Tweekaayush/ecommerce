import React from "react";
import img1 from "/assets/category/img1.jpg";
import img2 from "/assets/category/img2.jpg";
import img3 from "/assets/category/img3.jpg";
import img4 from "/assets/category/img4.jpg";
import { useNavigate } from "react-router-dom";

const HomeCategories = () => {
  const navigate = useNavigate();
  return (
    <section className="h-fit pt-0">
      <div className="container h-[60vh] grid grid-cols-4 grid-rows-2 gap-2">
        <div
          className="col-span-2 row-span-1 md:col-span-2 md:row-span-2 relative overflow-hidden cursor-pointer"
          onClick={() => navigate("/browse?category=furniture")}
        >
          <div className="category-overlay"></div>
          <h1 className="home-category-title">Furniture</h1>
          <img
            src={img1}
            alt=""
            className="h-full w-full object-cover object-[50%_50%]"
          />
        </div>
        <div
          className="col-span-2 row-span-1 md:col-span-1 md:row-span-2 relative overflow-hidden cursor-pointer"
          onClick={() => navigate("/browse?category=skin-care")}
        >
          <div className="category-overlay"></div>
          <h1 className="home-category-title">skin-care</h1>
          <img
            src={img2}
            alt=""
            className="h-full w-full object-cover object-[50%_50%]"
          />
        </div>
        <div
          className="col-span-2 row-span-1 md:col-span-1 relative overflow-hidden cursor-pointer"
          onClick={() => navigate("/browse?category=kitchen")}
        >
          <div className="category-overlay"></div>
          <h1 className="home-category-title">Kitchen</h1>
          <img
            src={img3}
            alt=""
            className="h-full w-full object-cover object-[50%_50%]"
          />
        </div>
        <div
          className="col-span-2 row-span-1 md:col-span-1 relative overflow-hidden cursor-pointer"
          onClick={() => navigate("/browse?category=electronic")}
        >
          <div className="category-overlay"></div>
          <h1 className="home-category-title">electronics</h1>
          <img
            src={img4}
            alt=""
            className="h-full w-full object-cover object-[50%_50%]"
          />
        </div>
      </div>
    </section>
  );
};

export default HomeCategories;
