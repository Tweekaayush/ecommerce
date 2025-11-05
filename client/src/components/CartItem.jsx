import { X } from "lucide-react";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { removeFromCart, updateQuantity } from "../features/cart.slice";
import { useDispatch, useSelector } from "react-redux";

const CartItem = (props) => {
  const { _id, name, price, image, countInStock, quantity, brand } = props;
  const [qty, setQty] = useState(quantity);
  const dispatch = useDispatch();
  const {
    data: {
      user: { _id: userId },
    },
  } = useSelector((state) => state.user);

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
      <div className="col-span-7 p-2 flex flex-col">
        <h1 className="text-base font-bold">{brand}</h1>
        <h1 className="text-sm ellipses">{name}</h1>
        <div className="flex w-fit bg-gray-100 mt-2 mb-1">
          <button
            className="py-1 px-2 text-sm cursor-pointer"
            onClick={() =>
              dispatch(
                updateQuantity({
                  userId: userId,
                  productId: _id,
                  quantity: qty - 1,
                })
              )
            }
          >
            -
          </button>
          <span className="py-1 px-2 text-sm ">{qty}</span>
          <button
            className="py-1 px-2 text-sm cursor-pointer"
            onClick={() =>
              dispatch(
                updateQuantity({
                  userId: userId,
                  productId: _id,
                  quantity: qty + 1,
                })
              )
            }
          >
            +
          </button>
        </div>
        <div className="flex">
          <span className="text-xs mt-0.5">$</span>
          <p className="font-semibold ml-0.5">{price}</p>
        </div>
      </div>
      <div className="col-span-1 py-2">
        <X
          onClick={() =>
            dispatch(removeFromCart({ userId: userId, productId: _id }))
          }
          className="cursor-pointer w-5 h-5"
        />
      </div>
    </div>
  );
};

export default CartItem;
