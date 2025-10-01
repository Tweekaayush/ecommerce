const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

export const updateCart = (state) => {
  state.data.subTotal = addDecimals(
    state.data.cart.reduce((acc, item) => acc + item.price * item.quantity, 0)
  );
  localStorage.setItem("cart", JSON.stringify(state.data));
};
