import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import BASE_URL from "../constants/constants";
import {loadStripe} from '@stripe/stripe-js'

const initialState = {
  loading: false,
  data: {
    orderList: [],
    orderDetails: {},
  },
  successMessage: "",
  error: "",
};

export const placeOrder = createAsyncThunk(
  "placeOrder",
  async (payload, { rejectWithValue }) => {
    try {
      const key = await axios.get(`${BASE_URL}/payment/key`, {
        withCredentials: true,
      });

      const stripe = await loadStripe(key.data.stripeKey);

      const res = await axios.post(`${BASE_URL}/payment/create-checkout-session`, payload, {
        withCredentials: true,
      });

      console.log(payload, res.data)

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
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${BASE_URL}/payment/checkout-success`, payload, {
        withCredentials: true,
      });

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
    });
    builder.addCase(validateOrder.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default orderSlice.reducer;
