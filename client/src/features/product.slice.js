import { createAsyncThunk, createSlice, isAction } from "@reduxjs/toolkit";
import axios from "axios";
import BASE_URL from "../constants/constants";
import { getProductsList } from "./admin.slice";
import { PRODUCT_API } from "../constants/constants";
import { REVIEW_API } from "../constants/constants";

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
        `${PRODUCT_API}?page=${page}&category=${category}`,
        { withCredentials: true }
      );

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
      const res = await axios.get(`${PRODUCT_API}/${payload}`, {
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
      const res = await axios.get(`${PRODUCT_API}/featured`, {
        withCredentials: true,
      });

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
      const res = await axios.get(
        `${PRODUCT_API}/recommended?category=${payload}`,
        {
          withCredentials: true,
        }
      );
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
      const res = await axios.get(`${PRODUCT_API}/bestSeller`, {
        withCredentials: true,
      });
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
      const res = await axios.post(`${PRODUCT_API}`, payload, {
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
      const res = await axios.put(`${PRODUCT_API}/${payload._id}`, payload, {
        withCredentials: true,
      });

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
      const res = await axios.delete(`${PRODUCT_API}/${payload.id}`, {
        withCredentials: true,
      });

      dispatch(getProductsList({ page: payload.page, category: "" }));

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
      const res = await axios.get(`${PRODUCT_API}/categories`, {
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
      const res = await axios.post(`${REVIEW_API}/${payload._id}`, payload, {
        withCredentials: true,
      });

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
      const res = await axios.get(`${PRODUCT_API}/count`, {
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
  reducers: {
    clearProductError: (state, action) => {
      state.error = "";
    },
    clearProductSuccessMessage: (state, action) => {
      state.successMessage = "";
    },
  },
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
    builder.addCase(createProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.data.productDetails = action.payload.product;
      state.successMessage = action.payload.message;
    });
    builder.addCase(createProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(updateProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.data.productDetails = action.payload.product;
      state.successMessage = action.payload.message;
    });
    builder.addCase(updateProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(deleteProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.data.successMessage = action.payload.message;
    });
    builder.addCase(deleteProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(addReview.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addReview.fulfilled, (state, action) => {
      state.loading = false;
      state.data.successMessage = action.payload.message;
    });
    builder.addCase(addReview.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { clearProductError, clearProductSuccessMessage } =
  productSlice.actions;

export default productSlice.reducer;
