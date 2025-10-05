import { X } from "lucide-react";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { removeFromCart, updateQuantity } from "../slices/cart.slice";
import { useDispatch } from "react-redux";

const CartItem = (props) => {
  const { _id, name, price, image, countInStock, quantity } = props;
  const [qty, setQty] = useState(quantity);
  const dispatch = useDispatch();

  useEffect(() => {
    if (qty !== quantity) {
      dispatch(updateQuantity({ ...props, quantity: qty }));
    }
  }, [qty]);

  useEffect(() => {
    setQty(quantity);
  }, [quantity]);
  return (
    <div className="grid border border-black grid-cols-12">
      <div className="col-span-4 flex items-center bg-gray-100">
        <img
          src={image}
          alt={name}
          className="w-full aspect-square object-cover object-[center_center] mix-blend-multiply"
        />
      </div>
      <div className="col-span-7 p-2 flex flex-col justify-between">
        <h1 className="text-sm">{name}</h1>
        <div className="flex w-fit bg-gray-100">
          <button
            className="py-1 px-2 text-sm cursor-pointer"
            onClick={() => setQty((prev) => prev - 1)}
          >
            -
          </button>
          <span className="py-1 px-2 text-sm ">{qty}</span>
          <button
            className="py-1 px-2 text-sm cursor-pointer"
            onClick={() => setQty((prev) => prev + 1)}
          >
            +
          </button>
        </div>
        <p>${price}</p>
      </div>
      <div className="col-span-1 py-2">
        <X
          onClick={() => dispatch(removeFromCart(_id))}
          className="cursor-pointer w-5 h-5"
        />
      </div>
    </div>
  );
};

export default CartItem;
