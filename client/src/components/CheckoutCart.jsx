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
    <div className="grid grid-cols-12 border border-gray-400 max-h-36">
      <div className="flex items-center h-full bg-gray-100 col-span-2">
        <img
          src={image}
          alt={name}
          className="w-full object-cover object-[50%_50%] mix-blend-multiply"
        />
      </div>
      <div className="p-2 col-span-4">
        <h1 className="text-sm text-black">{name}</h1>
        <p className="text-sm text-gray-600">Brand: {brand}</p>
      </div>
      <p className="text-sm font-extrabold col-span-2 md:col-span-1 py-2">
        ${price}
      </p>
      <div className="col-span-2 md:col-span-4 p-2">
        <div className="flex w-fit bg-gray-100 ">
          {update && (
            <button
              onClick={decreateQty}
              className="w-7 h-7 text-sm text-center"
            >
              -
            </button>
          )}
          <span className="w-7 h-7 text-sm text-center p-1">{qty}</span>
          {update && (
            <button
              className="w-7 h-7 text-sm text-center"
              onClick={increaseQty}
              disabled={qty === countInStock}
            >
              +
            </button>
          )}
        </div>
      </div>
      <div className="py-2 pr-2 col-span-2 md:col-span-1 flex flex-col justify-between">
        <p className="text-sm font-extrabold text-center">
          ${(price * quantity).toFixed(2)}
        </p>
        {update ? (
          <Trash
            title="Remove"
            className="w-5 h-5 text-red-500 cursor-pointer self-end"
            onClick={() => dispatch(removeFromCart(_id))}
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

const CheckoutCart = ({ update = true }) => {
  const {
    data: { cart },
  } = useSelector((state) => state.cart);

  return (
    <div className="flex flex-col w-full col-span-12 lg:col-span-8">
      <h1 className="mb-8 heading-1">Cart Items</h1>
      <div className="grid grid-cols-12 mb-8">
        <span className="list-head col-span-6">product</span>
        <span className="list-head col-span-2 md:col-span-1">price</span>
        <span className="list-head col-span-2 md:col-span-4">quantity</span>
        <span className="list-head col-span-2 md:col-span-1">subtotal</span>
      </div>
      <ul className="flex flex-col w-full gap-4">
        {cart?.map((item) => {
          return <CheckoutCartItem key={item._id} {...item} update={update} />;
        })}
      </ul>
    </div>
  );
};

export default CheckoutCart;
