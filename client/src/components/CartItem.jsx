import { X } from "lucide-react";
import React from "react";
import { useState } from "react";

const CartItem = ({ _id, name, price, image, countInStock }) => {
  const [qty, setQty] = useState(1);
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
          <button className="py-1 px-2 text-sm cursor-pointer">-</button>
          <span className="py-1 px-2 text-sm ">{qty}</span>
          <button className="py-1 px-2 text-sm cursor-pointer">+</button>
        </div>
        <p>${price}</p>
      </div>
      <div className="col-span-1 py-2">
        <X />
      </div>
    </div>
  );
};

export default CartItem;
