import React from "react";
import { ShoppingCart, Heart, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeFromWishlist, addToWishlist } from "../features/user.slice";
import Rating from "./Rating";
import { addToCart } from "../features/cart.slice";

const ProductCard = ({
  _id,
  name,
  price,
  image,
  rating,
  brand,
  wishlist = false,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    data: {
      user: { _id: userId },
    },
  } = useSelector((state) => state.user);


  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (wishlist) dispatch(removeFromWishlist({ _id }));
    dispatch(
      addToCart({
        userId: userId,
        item: {
          name,
          image,
          price,
          _id,
          brand,
          quantity: 1,
        },
      })
    );
  };

  return (
    <div
      className={
        "flex flex-col shadow-card hover:shadow-card-hover transition-all ease-in-out duration-300 cursor-pointer group h-fit w-full"
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
        <h1 className="text-sm xs:text-base font-bold ellipses">{brand}</h1>
        <h1 className="text-xs xs:text-sm mb-1 ellipses text-gray-700">{name}</h1>
        <Rating rating={rating} size={16} className="mb-3" />
        <div className="flex items-start">
          <span className="text-xs mt-0.5 xs:mt-1">$</span>
          <p className="text-md xs:text-lg font-semibold ml-0.5">{price}</p>
        </div>
        <div className="absolute bottom-0 right-0 flex gap-2 p-2 translate-y-full group-hover:translate-y-[0%] transition-all duration-300 ease-in-out">
          {wishlist ? (
            <Trash
              className="w-5 h-5 text-red-500"
              onClick={(e) => [
                e.stopPropagation(),
                dispatch(
                  removeFromWishlist({ _id, message: "Removed from wishlist" })
                ),
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
