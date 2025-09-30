import { createAsyncThunk, createSlice, isAction } from "@reduxjs/toolkit";
import axios from "axios";
import BASE_URL from "../constants/constants";

const initialState = {
  loading: "",
  data: {
    products: [],
    featuredProducts: [],
    recommendedProducts: [],
    bestSellingProducts: [],
    productDetails: {},
    categories: [],
    totalPages: 0,
  },
  successMessage: "",
  error: "",
};

export const getProducts = createAsyncThunk(
  "getProducts",
  async (payload, { rejectWithValue }) => {
    try {
      const { page, category } = payload;
      const res = await axios.get(
        `${BASE_URL}/product?page=${page}&category=${category}`,
        { withCredentials: true }
      );
      console.log(res);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const getProductById = createAsyncThunk(
  "getProductById",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL}/product/${payload}`, {
        withCredentials: true,
      });
      return res.data.product;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const getFeaturedProducts = createAsyncThunk(
  "getFeaturedProducts",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL}/product/featured`);
      ``
      return res.data.featuredProducts;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
export const getRecommendedProducts = createAsyncThunk(
  "getRecommendedProducts",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL}/product/recommended`);
      return res.data.recommendedProducts;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const getBestSellingProducts = createAsyncThunk(
  "getBestSellingProducts",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL}/product/bestSeller`);
      return res.data.products;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const createProduct = createAsyncThunk(
  "createProduct",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${BASE_URL}/product`, payload, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "updateProduct",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.put(
        `${BASE_URL}/product/${payload.id}`,
        payload,
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

export const deleteProduct = createAsyncThunk(
  "deleteProduct",
  async (payload, { dispatch, rejectWithValue }) => {
    try {
      const res = await axios.delete(`${BASE_URL}/product/${payload}`, {
        withCredentials: true,
      });

      dispatch(getProducts({ page: 1, category: "" }));

      return res.data.message;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const getAllCategories = createAsyncThunk(
  "getAllCategories",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL}/product/categories`, {
        withCredentials: true,
      });

      return res.data.categories;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const addReview = createAsyncThunk(
  "addReview",
  async (payload, { dispatch, rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/product/${payload._id}/reviews`,
        payload,
        {
          withCredentials: true,
        }
      );

      dispatch(getProductById(payload._id));

      return res.data.message;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const getProductsCount = createAsyncThunk(
  "getProductsCount",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL}/product/count`, {
        withCredentials: true,
      });

      return res.data.productCount;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.data.products = action.payload.products;
      state.data.totalPages = action.payload.totalPages;
      state.data.page = action.payload.page;
    });
    builder.addCase(getProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(getAllCategories.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllCategories.fulfilled, (state, action) => {
      state.loading = false;
      state.data.categories = action.payload;
    });
    builder.addCase(getAllCategories.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(getFeaturedProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getFeaturedProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.data.featuredProducts = action.payload;
    });
    builder.addCase(getFeaturedProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(getRecommendedProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getRecommendedProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.data.recommendedProducts = action.payload;
    });
    builder.addCase(getRecommendedProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(getBestSellingProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getBestSellingProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.data.bestSellingProducts = action.payload;
    });
    builder.addCase(getBestSellingProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(getProductById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getProductById.fulfilled, (state, action) => {
      state.loading = false;
      state.data.productDetails = action.payload;
    });
    builder.addCase(getProductById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

// export const {} = productSlice.actions;

export default productSlice.reducer;
