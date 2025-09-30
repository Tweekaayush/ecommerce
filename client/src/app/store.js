import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/user.slice";
import productReducer from "../slices/product.slice";
import adminReducer from "../slices/admin.slice";

const rootReducer = combineReducers({
  user: userReducer,
  product: productReducer,
  admin: adminReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
