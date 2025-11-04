import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import BASE_URL from "../constants/constants";
import axios from "axios";
import { ANALYTICS_API } from "../constants/constants";
import { USER_API } from "../constants/constants";
import { PRODUCT_API } from "../constants/constants";
import { ORDER_API } from "../constants/constants";

const initialState = {
  loading: false,
  data: {
    totalUsers: 0,
    totalRevenue: 0,
    totalSales: 0,
    totalProducts: 0,
    userList: [],
    orderList: [],
    productList: [],
    revenueChart: [],
    orderStatus: [],
    totalPages: 0,
  },
  successMessage: "",
  error: "",
};

export const getAnalytics = createAsyncThunk(
  "getAnalytics",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${ANALYTICS_API}`, {
        withCredentials: true,
      });
      return res.data.analytics;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const getUsersList = createAsyncThunk(
  "getUsersList",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${USER_API}/list?page=${payload}`, {
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const getProductsList = createAsyncThunk(
  "getProductsList",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${PRODUCT_API}/list?page=${payload}`, {
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const getOrdersList = createAsyncThunk(
  "getOrdersList",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${ORDER_API}/list?page=${payload}`, {
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    clearAdminError: (state, action) => {
      state.error = "";
    },
    clearAdminSuccessMessage: (state, action) => {
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAnalytics.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getAnalytics.fulfilled, (state, action) => {
      state.loading = false;
      state.data.totalUsers = action.payload.totalUsers;
      state.data.totalSales = action.payload.totalSales;
      state.data.totalRevenue = action.payload.totalRevenue;
      state.data.totalProducts = action.payload.totalProducts;
      state.data.revenueChart = action.payload.revenueChart;
      state.data.orderStatus = action.payload.orderStatus;
    });
    builder.addCase(getAnalytics.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(getUsersList.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getUsersList.fulfilled, (state, action) => {
      state.loading = false;
      state.data.userList = action.payload.userList;
      state.data.totalPages = action.payload.totalPages;
    });
    builder.addCase(getUsersList.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(getProductsList.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getProductsList.fulfilled, (state, action) => {
      state.loading = false;
      state.data.productList = action.payload.productList;
      state.data.totalPages = action.payload.totalPages;
    });
    builder.addCase(getProductsList.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(getOrdersList.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getOrdersList.fulfilled, (state, action) => {
      state.loading = false;
      state.data.orderList = action.payload.orderList;
      state.data.totalPages = action.payload.totalPages;
    });
    builder.addCase(getOrdersList.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { clearAdminError, clearAdminSuccessMessage } = adminSlice.actions;

export default adminSlice.reducer;
