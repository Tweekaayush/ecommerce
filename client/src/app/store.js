import { combineReducers, configureStore } from "@reduxjs/toolkit";
// import userReducer from "../slices/user.slice";
// import productReducer from "../slices/product.slice";
// import cartReducer from "../slices/cart.slice";
// import adminReducer from "../slices/admin.slice";
// import orderReducer from "../slices/order.slice";

const rootReducer = combineReducers({
  // user: userReducer,
  // product: productReducer,
  // cart: cartReducer,
  // admin: adminReducer,
  // order: orderReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
