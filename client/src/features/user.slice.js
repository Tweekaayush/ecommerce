import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import BASE_URL from "../constants/constants";
import { clearCartItems, getCartItems } from "./cart.slice";
import { USER_API } from "../constants/constants";
import { AUTH_API } from "../constants/constants";
import { COUPON_API } from "../constants/constants";
import { WISHLIST_API } from "../constants/constants";
// import { getCart } from "./cart.slice";

const initialState = {
  loading: false,
  data: {
    user: {},
    wishlist: [],
    cart: [],
    coupons: [],
  },
  successMessage: "",
  error: "",
};

export const loadUser = createAsyncThunk(
  "loadUser",
  async (payload, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.get(`${USER_API}/profile`, {
        withCredentials: true,
      });

      dispatch(getCartItems());

      return res.data.user;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const login = createAsyncThunk(
  "login",
  async (payload, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.post(`${AUTH_API}/login`, payload, {
        withCredentials: true,
      });

      dispatch(getCartItems());

      return res.data.user;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const signup = createAsyncThunk(
  "signup",
  async (payload, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.post(`${AUTH_API}/signup`, payload, {
        // headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      dispatch(getCartItems());

      return res.data.user;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const logout = createAsyncThunk(
  "logout",
  async (payload, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.post(`${AUTH_API}/logout`, payload, {
        withCredentials: true,
      });

      dispatch(clearCartItems());

      return res.data.message;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
export const forgetPassword = createAsyncThunk(
  "forgetPassword",
  async (payload, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.post(`${AUTH_API}/password/forget`, payload, {
        withCredentials: true,
      });

      return res.data.message;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
export const resetPassword = createAsyncThunk(
  "resetPassword",
  async (payload, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.post(`${AUTH_API}/password/reset`, payload, {
        withCredentials: true,
      });

      return res.data.message;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const updateProfile = createAsyncThunk(
  "updateProfile",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.put(`${USER_API}/profile`, payload, {
        withCredentials: true,
      });

      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const getCoupons = createAsyncThunk(
  "getCoupons",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${COUPON_API}`, {
        withCredentials: true,
      });

      return res.data.coupons;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const getWishlist = createAsyncThunk(
  "getWishlist",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${WISHLIST_API}`, {
        withCredentials: true,
      });

      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const addToWishlist = createAsyncThunk(
  "addToWishlist",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${WISHLIST_API}/add`,
        { product: payload },
        {
          withCredentials: true,
        }
      );

      return res.data.wishlist;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const removeFromWishlist = createAsyncThunk(
  "removeFromWishlist",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${WISHLIST_API}/remove`,
        { product: payload._id, message: payload.message },
        {
          withCredentials: true,
        }
      );

      console.log(res.data)

      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUserError: (state, action) => {
      state.error = "";
    },
    clearUserSuccessMessage: (state, action) => {
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loadUser.fulfilled, (state, action) => {
      state.loading = false;
      state.data.user = action.payload;
    });
    builder.addCase(loadUser.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(login.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.data.user = action.payload;
      state.successMessage = "Logged In Successfully";
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(signup.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(signup.fulfilled, (state, action) => {
      state.loading = false;
      state.data.user = action.payload;
      state.successMessage = "Signed Up Successfully";
    });
    builder.addCase(signup.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(logout.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      state.loading = false;
      state.data = {
        user: {},
        wishlist: [],
        cart: [],
        coupon: null,
      };
      state.successMessage = "Logged Out Successfully";
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(forgetPassword.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(forgetPassword.fulfilled, (state, action) => {
      state.loading = false;
      state.successMessage = action.payload;
    });
    builder.addCase(forgetPassword.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(resetPassword.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(resetPassword.fulfilled, (state, action) => {
      state.loading = false;
      state.successMessage = action.payload;
    });
    builder.addCase(resetPassword.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(updateProfile.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.data.user = action.payload.user;
      state.successMessage = action.payload.message;
    });
    builder.addCase(updateProfile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(getCoupons.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getCoupons.fulfilled, (state, action) => {
      state.loading = false;
      state.data.coupons = action.payload;
      state.successMessage = action.payload.message;
    });
    builder.addCase(getCoupons.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(getWishlist.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getWishlist.fulfilled, (state, action) => {
      state.loading = false;
      state.data.wishlist = action.payload.wishlist;
    });
    builder.addCase(getWishlist.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(addToWishlist.fulfilled, (state, action) => {
      state.loading = false;
      state.successMessage = "Added To Wishlist!";
      state.data.wishlist = action.payload;
    });
    builder.addCase(addToWishlist.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(removeFromWishlist.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(removeFromWishlist.fulfilled, (state, action) => {
      state.loading = false;
      state.successMessage = action.payload.message;
      state.data.wishlist = action.payload.wishlist;
    });
    builder.addCase(removeFromWishlist.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { clearUserError, clearUserSuccessMessage } = userSlice.actions;

export default userSlice.reducer;
