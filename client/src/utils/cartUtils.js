export const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

export const updateCart = (state) => {
  state.data.subTotal = addDecimals(
    state.data.cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0)
  );

  if (state.data.coupon) {
    state.data.discount = addDecimals(
      state.data.subTotal * (state.data.coupon?.discountPercentage / 100)
    );
  } else {
    state.data.discount = 0;
  }
  state.data.total = addDecimals(state.data.subTotal - state.data.discount);

  localStorage.setItem("cart", JSON.stringify(state.data));
};
