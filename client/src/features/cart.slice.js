import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import BASE_URL from "../constants/constants";
import { updateCart } from "../utils/cartUtils";
import { CART_API } from "../constants/constants";
import { COUPON_API } from "../constants/constants";

const initialState = {
  loading: false,
  data: JSON.parse(localStorage.getItem("cart")) || {
    cart: [],
    wishlist: [],
    coupon: null,
    total: 0,
    subTotal: 0,
    discount: 0,
    shippingAddress: {},
  },
  successMessage: "",
  error: "",
};

export const getCartItems = createAsyncThunk(
  "getCartItems",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${CART_API}/`, {
        withCredentials: true,
      });
      return res.data.cartItems;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const addToCart = createAsyncThunk(
  "addToCart",
  async (payload, { rejectWithValue, getState }) => {
    try {
      const { userId, item } = payload;

      if (!userId) {
        let cartItems = getState().cart.data.cart;
        const existItem = cartItems.find(
          (x) => x.product._id.toString() === item._id.toString()
        );

        if (existItem) {
          cartItems = cartItems.map((x) =>
            x.product._id.toString() === existItem.product._id.toString()
              ? {
                  ...x,
                  quantity: x.quantity + item.quantity,
                }
              : x
          );
        } else {
          cartItems = [
            ...cartItems,
            { quantity: item.quantity, product: { ...item, quantity: "" } },
          ];
        }

        return cartItems;
      }

      const res = await axios.post(`${CART_API}/add`, payload, {
        withCredentials: true,
      });

      return res.data.cartItems;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const removeFromCart = createAsyncThunk(
  "removeFromCart",
  async (payload, { rejectWithValue, getState }) => {
    try {
      const { userId, productId } = payload;

      if (!userId) {
        let cartItems = getState().cart.data.cart.filter(
          (x) => x.product._id.toString() !== productId.toString()
        );

        return cartItems;
      }

      const res = await axios.post(`${CART_API}/remove`, payload, {
        withCredentials: true,
      });

      return res.data.cartItems;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const updateQuantity = createAsyncThunk(
  "updateQuantity",
  async (payload, { rejectWithValue, getState }) => {
    try {
      const { userId, productId, quantity } = payload;
      if (!userId) {
        let cartItems = getState().cart.data.cart;
        if (quantity) {
          cartItems = cartItems.map((x) =>
            x.product._id === productId ? { ...x, quantity: quantity } : x
          );
        } else {
          cartItems = cartItems.filter((item) => item._id !== productId);
        }
        return cartItems;
      }

      const res = await axios.post(`${CART_API}/update-qty`, payload, {
        withCredentials: true,
      });

      return res.data.cartItems;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const validateCoupon = createAsyncThunk(
  "validateCoupon",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${COUPON_API}/validate`,
        { code: payload },
        {
          withCredentials: true,
        }
      );

      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    saveShippingAddress: (state, action) => {
      state.data.shippingAddress = action.payload;
      return updateCart(state);
    },
    setCoupon: (state, action) => {
      state.data.coupon = action.payload;
      return updateCart(state);
    },
    clearCartItems: (state, action) => {
      state.data.cart = [];
      state.data.wishlist = [];
      state.data.coupon = null;
      state.data.total = 0;
      state.data.subTotal = 0;
      state.data.discount = 0;
      state.data.shippingAddress = {};
      return updateCart(state);
    },
    clearCartSuccessMessage: (state, action) => {
      state.successMessage = "";
    },
    clearCartErrors: (state, action) => {
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCartItems.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getCartItems.fulfilled, (state, action) => {
      state.loading = false;
      state.data.cart = action.payload;
      return updateCart(state);
    });
    builder.addCase(getCartItems.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(addToCart.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(addToCart.fulfilled, (state, action) => {
      state.loading = false;
      state.data.cart = action.payload;
      state.successMessage = "Added to cart";
      return updateCart(state);
    });
    builder.addCase(addToCart.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(removeFromCart.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(removeFromCart.fulfilled, (state, action) => {
      state.loading = false;
      state.data.cart = action.payload;
      state.successMessage = "Removed From Cart";
      return updateCart(state);
    });
    builder.addCase(removeFromCart.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(updateQuantity.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updateQuantity.fulfilled, (state, action) => {
      state.loading = false;
      state.data.cart = action.payload;
      state.successMessage = "Cart updated";
      return updateCart(state);
    });
    builder.addCase(updateQuantity.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(validateCoupon.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(validateCoupon.fulfilled, (state, action) => {
      state.loading = false;
      state.data.coupon = action.payload.coupon;
      state.successMessage = action.payload.message;
      return updateCart(state);
    });
    builder.addCase(validateCoupon.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const {
  saveShippingAddress,
  clearCartItems,
  setCoupon,
  clearCartSuccessMessage,
  clearCartErrors,
} = cartSlice.actions;

export default cartSlice.reducer;
