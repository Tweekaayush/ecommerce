import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import BASE_URL from "../constants/constants";
import { loadStripe } from "@stripe/stripe-js";
import { clearCartItems } from "./cart.slice";

const initialState = {
  loading: false,
  data: {
    orderId: null,
    orderList: [],
    orderDetails: {},
    totalPages: 0,
  },
  successMessage: "",
  error: "",
};

export const getMyOrders = createAsyncThunk(
  "getMyOrders",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${BASE_URL}/order/my-orders?page=${payload}`,
        {
          withCredentials: true,
        }
      );

      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.messsage);
    }
  }
);

export const getOrderById = createAsyncThunk(
  "getOrderById",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL}/order/${payload}`, {
        withCredentials: true,
      });

      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.messsage);
    }
  }
);

export const updateOrder = createAsyncThunk(
  "updateOrder",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.put(`${BASE_URL}/order/${payload.id}`, payload, {
        withCredentials: true,
      });

      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.messsage);
    }
  }
);

export const placeOrder = createAsyncThunk(
  "placeOrder",
  async (payload, { rejectWithValue }) => {
    try {
      const key = await axios.get(`${BASE_URL}/payment/key`, {
        withCredentials: true,
      });

      const stripe = await loadStripe(key.data.stripeKey);

      const res = await axios.post(
        `${BASE_URL}/payment/create-checkout-session`,
        payload,
        {
          withCredentials: true,
        }
      );

      const result = stripe.redirectToCheckout({
        sessionId: res.data.id,
      });

      return true;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const validateOrder = createAsyncThunk(
  "validateOrder",
  async (payload, { dispatch, rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/payment/checkout-success`,
        payload,
        {
          withCredentials: true,
        }
      );
      dispatch(clearCartItems());

      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(placeOrder.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(placeOrder.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(placeOrder.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(validateOrder.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(validateOrder.fulfilled, (state, action) => {
      state.loading = false;
      state.data.orderId = action.payload.orderId;
    });
    builder.addCase(validateOrder.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(getMyOrders.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getMyOrders.fulfilled, (state, action) => {
      state.loading = false;
      state.data.orderList = action.payload.orderList;
      state.data.totalPages = action.payload.totalPages;
    });
    builder.addCase(getMyOrders.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(getOrderById.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getOrderById.fulfilled, (state, action) => {
      state.loading = false;
      state.data.orderDetails = action.payload.order;
    });
    builder.addCase(getOrderById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(updateOrder.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updateOrder.fulfilled, (state, action) => {
      state.loading = false;
      state.data.orderDetails = action.payload.order;
    });
    builder.addCase(updateOrder.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default orderSlice.reducer;
