import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { clearCartItems } from "./cart.slice";
import { ORDER_API } from "../constants/constants";
import { PAYMENT_API } from "../constants/constants";

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
      const res = await axios.get(`${ORDER_API}/my-orders?page=${payload}`, {
        withCredentials: true,
      });

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
      const res = await axios.get(`${ORDER_API}/${payload}`, {
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
      const res = await axios.put(`${ORDER_API}/${payload.id}`, payload, {
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
      const res = await axios.post(
        `${PAYMENT_API}/create-checkout-session`,
        payload,
        {
          withCredentials: true,
        }
      );

      window.location.href = res.data.session.url;

      return true;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const retryPayment = createAsyncThunk(
  "retryPayment",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${PAYMENT_API}/retry-payment`, payload, {
        withCredentials: true,
      });

      window.location.href = res.data.session.url;

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
      const res = await axios.post(`${PAYMENT_API}/checkout-success`, payload, {
        withCredentials: true,
      });
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
  reducers: {
    clearOrderError: (state, action) => {
      state.error = "";
    },
    clearOrderSuccessMessage: (state, action) => {
      state.successMessage = "";
    },
  },
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
    builder.addCase(retryPayment.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(retryPayment.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(retryPayment.rejected, (state, action) => {
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
      state.successMessage = action.payload.message;
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

export const { clearOrderError, clearOrderSuccessMessage } = orderSlice.actions;

export default orderSlice.reducer;
