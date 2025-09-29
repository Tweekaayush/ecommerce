import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/user.slice";
import productReducer from "../slices/product.slice";

const rootReducer = combineReducers({
  user: userReducer,
  product: productReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
