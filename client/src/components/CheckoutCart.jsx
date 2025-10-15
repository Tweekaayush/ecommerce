import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, updateQuantity } from "../slices/cart.slice";
import { Trash } from "lucide-react";

const CheckoutCartItem = (props) => {
  const { update, ...item } = props;
  const { _id, name, brand, image, quantity, price, countInStock } = item;
  const [qty, setQty] = useState(quantity);
  const dispatch = useDispatch();
  const {
    data: {
      user: { _id: userId },
    },
  } = useSelector((state) => state.user);

  const increaseQty = () => {
    dispatch(
      updateQuantity({ userId: userId, productId: _id, quantity: qty + 1 })
    );
    setQty((prev) => prev + 1);
  };

  const decreateQty = () => {
    dispatch(
      updateQuantity({ userId: userId, productId: _id, quantity: qty - 1 })
    );
  };

  useEffect(() => {
    setQty(quantity);
  }, [quantity]);

  return (
    <div className="grid grid-cols-[5fr_2fr_3fr_2fr]  sm:grid-cols-[2fr_3fr_2fr_3fr_2fr] border border-gray-400 min-h-20">
      <div className="items-center w-full h-full bg-gray-100 hidden sm:flex">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover object-[50%_50%] mix-blend-multiply"
        />
      </div>
      <div className="p-2">
        <h1 className="text-base font-bold">{brand}</h1>
        <h1 className="text-sm text-gray-700">{name}</h1>
      </div>
      <div className="flex py-2">
        <span className="text-xs mt-0.5">$</span>
        <p className="text-base ml-0.5 font-medium">{price}</p>
      </div>
      <div className="p-2">
        <div className="flex w-fit bg-gray-100 ">
          {update && (
            <button
              onClick={decreateQty}
              className="w-5 h-5 sm:w-7 sm:h-7 text-xs md:text-sm text-center"
            >
              -
            </button>
          )}
          <span className="w-5 h-5 sm:w-7 sm:h-7 text-xs md:text-sm text-center p-0.5 sm:p-1">
            {qty}
          </span>
          {update && (
            <button
              className="w-5 h-5 sm:w-7 sm:h-7 text-xs md:text-sm text-center"
              onClick={increaseQty}
              disabled={qty === countInStock}
            >
              +
            </button>
          )}
        </div>
      </div>
      <div className="py-2 pr-2 flex flex-col justify-between">
        <div className="flex">
          <span className="text-xs mt-0.5">$</span>
          <p className="text-base ml-0.5 font-medium">
            {(price * quantity).toFixed(2)}
          </p>
        </div>
        {update ? (
          <Trash
            title="Remove"
            className="w-3 h-3 md:w-5 md:h-5 text-red-500 cursor-pointer self-end"
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
    <div className="flex flex-col w-full">
      <h1 className="mb-8 heading-1 text-red-500 text-sm">Cart Items</h1>
      <div className="grid grid-cols-[5fr_2fr_3fr_2fr] mb-8">
        <span className="list-head">product</span>
        <span className="list-head">price</span>
        <span className="list-head">quantity</span>
        <span className="list-head">subtotal</span>
      </div>
      <ul className="flex flex-col w-full gap-4">
        {cart?.map((item) => {
          return (
            <CheckoutCartItem
              key={item._id}
              {...item.product}
              quantity={item.quantity}
              update={update}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default CheckoutCart;
