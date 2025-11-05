import React from "react";
import { X } from "lucide-react";
import CartItem from "./CartItem";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Cart = ({ cartOpen, setCartOpen }) => {
  const {
    data: { cart, subTotal },
  } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  return (
    <div
      className={`${
        cartOpen ? "translate-x-0" : "translate-x-full"
      } fixed top-0 right-0 h-full w-full xs:w-[400px] z-[100] bg-white flex flex-col transition-all duration-300 ease-in-out`}
    >
      <div className="flex items-center bg-black p-4">
        <h1 className="text-white uppercase font-semibold w-full tracking-wide">
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
          <div className="h-full overflow-y-auto mb-4">
            <div className="flex flex-col gap-4 p-4">
              {cart?.map((x) => {
                return (
                  <CartItem key={x._id} {...x.product} quantity={x.quantity} />
                );
              })}
            </div>
          </div>
          <div className="grid grid-cols-2 p-4 border-dotted border-t-2">
            <h1 className="font-bold text-lg">Subtotal:</h1>
            <div className="text-right flex justify-end text-green-500 ">
              <span className="text-xs mt-0.5">$</span>
              <p className="font-bold">{subTotal}</p>
            </div>
            <button
              className="button-1 col-span-2 mt-4"
              onClick={() => navigate("/checkout")}
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
