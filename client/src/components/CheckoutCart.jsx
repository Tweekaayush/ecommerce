import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, updateQuantity } from "../slices/cart.slice";
import { Trash } from "lucide-react";

const CheckoutCartItem = (props) => {
  const { update, ...item } = props;
  const { _id, name, brand, image, quantity, price, countInStock } = item;
  const [qty, setQty] = useState(quantity);
  const dispatch = useDispatch();

  const increaseQty = () => {
    setQty((prev) => prev + 1);
  };

  const decreateQty = () => {
    setQty((prev) => prev - 1);
  };

  useEffect(() => {
    dispatch(updateQuantity({ ...item, quantity: qty }));
  }, [qty]);

  return (
    <div className="grid grid-cols-12 border-b pb-4 min-h-36">
      <div className="flex items-center h-full bg-gray-100 col-span-2">
        <img
          src={image}
          alt={name}
          className="w-full object-cover object-[50%_50%] mix-blend-multiply"
        />
      </div>
      <div className="px-2 col-span-3">
        <h1 className="text-sm text-black">{name}</h1>
        <p className="text-sm text-gray-600">Brand: {brand}</p>
      </div>
      <p className="text-sm font-extrabold col-span-1">${price}</p>
      <div className="col-span-3">
        <div className="flex w-fit bg-gray-100 ">
          {update && <button onClick={decreateQty} className="w-7 h-7 text-sm text-center">-</button>}
          <span className="w-7 h-7 text-sm text-center p-1">{qty}</span>
          {update && (
            <button className="w-7 h-7 text-sm text-center" onClick={increaseQty} disabled={qty === countInStock}>
              +
            </button>
          )}
        </div>
      </div>
      <p className="text-sm font-extrabold col-span-2">${(price * quantity).toFixed(2)}</p>
      {update?<Trash className="w-4 h-4 text-red-500 cursor-pointer" onClick={()=>dispatch(removeFromCart(_id))}/>:<></>}
    </div>
  );
};

const CheckoutCart = ({ update = true }) => {
  const {
    data: { cart },
  } = useSelector((state) => state.cart);
  return (
    <div className="flex flex-col w-full col-span-8">
      <h1 className="mb-8 heading-1">Cart Items</h1>
      <div className="grid grid-cols-12 mb-8">
        <span className="list-head col-span-5">
          product
        </span>
        <span className="list-head col-span-1">
          price
        </span>
        <span className="list-head col-span-3">
          quantity
        </span>
        <span className="list-head col-span-2">
          total
        </span>
        <span className="list-head col-span-1"></span>
      </div>
      <ul className="flex- flex-col w-full">
        {cart?.map((item) => {
          return <CheckoutCartItem key={item._id} {...item} update={update} />;
        })}
      </ul>
    </div>
  );
};

export default CheckoutCart;
