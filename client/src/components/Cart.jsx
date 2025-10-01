import React from "react";
import { X } from "lucide-react";
import CartItem from "./CartItem";
import { useSelector } from "react-redux";

const Cart = ({ cartOpen, setCartOpen }) => {
  const {
    data: { cart, subTotal },
  } = useSelector((state) => state.cart);
  return (
    <div
      className={`${
        cartOpen ? "translate-x-0" : "translate-x-full"
      } fixed top-0 right-0 h-full w-[400px] z-[100] bg-white flex flex-col transition-all duration-300 ease-in-out`}
    >
      <div className="flex items-center bg-black px-4 h-16">
        <h1 className="text-white text-md uppercase font-semibold w-full tracking-wide">
          Cart ({cart?.length} items)
        </h1>
        <X
          className="text-white w-6 h-6 cursor-pointer"
          onClick={() => setCartOpen(false)}
        />
      </div>
      {!cart?.length ? (
        <div className="w-full h-full flex items-center justify-center">
          <img src="/assets/cart/empty-cart.png" alt="empty-cart" />
        </div>
      ) : (
        <>
          <div className="flex flex-col p-4 h-full">
            <div className="flex flex-col g-4 h-full overflow-y-auto">
              {cart?.map((x) => {
                return <CartItem key={x._id} {...x} />;
              })}
            </div>
          </div>
          <div className="grid grid-cols-2 p-4 border-dotted border-t-2">
            <h1 className="font-bold text-lg">Subtotal:</h1>
            <p className="text-green-500 font-bold text-right">${subTotal}</p>
            <button className="button-1 col-span-2 mt-4">Checkout</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
