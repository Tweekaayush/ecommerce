import React from "react";
import { ShoppingCart, Heart, Trash } from "lucide-react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeFromWishlist, addToWishlist } from "../slices/user.slice";
import Rating from "./Rating";
import { addToCart } from "../slices/cart.slice";

const ProductCard = ({
  _id,
  name,
  price,
  image,
  rating,
  brand,
  slider = false,
  wishlist = false,
}) => {
  const [width, setWidth] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleResize = () => {
    if (!slider) return;
    const container = document.getElementById("slider").offsetWidth;
    const slide = document.getElementById("slider");
    if (container > 992) {
      setWidth((container - 56) / 4);
      slide.scrollLeft = 0;
    } else if (container > 768) {
      setWidth((container - 40) / 3);
      slide.scrollLeft = 0;
    } else if (container > 480) {
      setWidth((container - 24) / 2);
      slide.scrollLeft = 0;
    } else {
      setWidth(container - 8);
      slide.scrollLeft = 0;
    }
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (wishlist) dispatch(removeFromWishlist(_id));
    dispatch(
      addToCart({
        name,
        image,
        price,
        _id,
        brand,
        quantity: 1,
      })
    );
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div
      style={slider ? { width: width } : {}}
      className={
        "flex flex-col shadow-card hover:shadow-card-hover transition-all ease-in-out duration-300 cursor-pointer group"
      }
      onClick={() => navigate(`/product/${_id}`)}
    >
      <div className="text-gray-100 w-full aspect-square bg-gray-100">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover object-[center_center] mix-blend-multiply"
        />
      </div>
      <div className="flex flex-col p-2 overflow-hidden relative">
        <h1 className="text-sm mb-2">{name}</h1>
        <Rating rating={rating} size={16} />
        <p className="text-md mt-4 font-bold">${price}</p>
        <div className="absolute bottom-0 right-0 flex gap-2 p-2 translate-y-[100%] group-hover:translate-y-[0%] transition-all duration-300 ease-in-out">
          {wishlist ? (
            <Trash
              className="w-5 h-5 text-red-500"
              onClick={(e) => [
                e.stopPropagation(),
                dispatch(removeFromWishlist(_id)),
              ]}
            />
          ) : (
            <Heart
              className="w-5 h-5"
              onClick={(e) => [
                e.stopPropagation(),
                dispatch(addToWishlist(_id)),
              ]}
            />
          )}
          <ShoppingCart className="w-5 h-5" onClick={handleAddToCart} />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
