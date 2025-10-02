import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import BASE_URL from "../constants/constants";
import { updateCart } from "../utils/cartUtils";

const initialState = {
  loading: false,
  data: JSON.parse(localStorage.getItem("cart")) || {
    cart: [],
    wishlist: [],
    coupon: null,
    total: 0,
    subTotal: 0,
    discount: 0,
  },
  successMessage: "",
  error: "",
};

// export const getCart = createAsyncThunk(
//   "getCart",
//   async (payload, { rejectWithValue }) => {
//     try {
//       const res = await axios.get(`${BASE_URL}/cart/`, {
//         withCredentials: true,
//       });
//       return res.data.cartItems;
//     } catch (error) {
//       return rejectWithValue(error.response.data.message);
//     }
//   }
// );

// export const updateCart = createAsyncThunk(
//   "update",
//   async (payload, { rejectWithValue }) => {
//     try {
//       const cart = payload.data.cart.map((x) => {
//         return { _id: x._id, quantity: x.quantity };
//       });
//       const res = await axios.post(
//         `${BASE_URL}/cart/`,
//         { data: cart },
//         {
//           withCredentials: true,
//         }
//       );

//       return res.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data.message);
//     }
//   }
// );

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;

      const existItem = state.data.cart.find((x) => x._id === item._id);

      if (existItem) {
        state.data.cart = state.data.cart.map((x) =>
          x._id === existItem._id
            ? {
                ...x,
                quantity: x.quantity + item.quantity,
              }
            : x
        );
      } else {
        state.data.cart = [...state.data.cart, item];
      }
      return updateCart(state);
    },
    removeFromCart: (state, action) => {
      const id = action.payload;

      state.data.cart = state.data.cart.filter((item) => item._id !== id);

      return updateCart(state);
    },

    updateQuantity: (state, action) => {
      const { _id: id, quantity } = action.payload;

      if (quantity) {
        state.data.cart = state.data.cart.map((x) =>
          x._id === id ? action.payload : x
        );
      } else {
        state.data.cart = state.data.cart.filter((item) => item._id !== id);
      }

      return updateCart(state);
    },
    saveShippingAddress: (state, action) => {
      state.data.shippingAddress = action.payload;
    },
    clearCartItems: (state, action) => {
      state.data.cart = [];
      state.data.shippingAddress = {};
      state.data.paymentMethod = "Card";
      return updateCart(state);
    },
  },
  extraReducers: (builder) => {
    // builder.addCase(updateCart.pending, (state, action) => {
    //   state.loading = true;
    // });
    // builder.addCase(updateCart.fulfilled, (state, action) => {
    //   state.loading = true;
    //   state.data.cart = action.payload.updatedCart;
    //   state.data.cartMessage = action.payload.cartMessage;
    //   state.data.subTotal = action.payload.subTotal;
    // });
    // builder.addCase(updateCart.rejected, (state, action) => {
    //   state.loading = true;
    //   state.error = action.payload;
    // });
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  saveShippingAddress,
  clearCartItems,
} = cartSlice.actions;

export default cartSlice.reducer;
