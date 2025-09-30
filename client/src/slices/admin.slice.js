import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import BASE_URL from "../constants/constants";
import axios from "axios";

const initialState = {
  loading: false,
  data: {
    totalUsers: 0,
    totalRevenue: 0,
    totalSales: 0,
    totalProducts: 0,
    userList: [],
    productList: [],
    revenueChart: [],
  },
  successMessage: "",
  error: "",
};

export const getAnalytics = createAsyncThunk(
  "getAnalytics",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL}/analytics`, {
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
      const res = await axios.get(`${BASE_URL}/user/list?page=${payload}`, {
        withCredentials: true,
      });
      return res.data.userList;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const getProductsList = createAsyncThunk(
  "getProductsList",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL}/product/list?page=${payload}`, {
        withCredentials: true,
      });
      return res.data.productList;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState,
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
      state.data.userList = action.payload;
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
      state.data.productList = action.payload;
    });
    builder.addCase(getProductsList.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default adminSlice.reducer;
