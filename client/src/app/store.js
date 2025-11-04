import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user.slice";
import productReducer from "../features/product.slice";
import cartReducer from "../features/cart.slice";
import adminReducer from "../features/admin.slice";
import orderReducer from "../features/order.slice";

const rootReducer = combineReducers({
  user: userReducer,
  product: productReducer,
  cart: cartReducer,
  admin: adminReducer,
  order: orderReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
