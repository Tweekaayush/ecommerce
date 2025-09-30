import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import BASE_URL from "../constants/constants";

const initialState = {
  loading: false,
  data: {
    user: {},
    wishList: [],
    cart: [],
  },
  successMessage: "",
  error: "",
};

export const loadUser = createAsyncThunk(
  "loadUser",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL}auth/profile`, {
        withCredentials: true,
      });
      return res.data.user;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const login = createAsyncThunk(
  "login",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${BASE_URL}/auth/login`, payload, {
        withCredentials: true,
      });

      return res.data.user;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const signup = createAsyncThunk(
  "signup",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${BASE_URL}/auth/signup`, payload, {
        // headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      return res.data.user;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const logout = createAsyncThunk(
  "logout",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${BASE_URL}/auth/logout`, payload, {
        withCredentials: true,
      });

      return res.data.message;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
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
        usersListAdmin: [],
        userDetailsAdmin: {},
        wishlist: [],
        cart: [],
      };
      state.successMessage = "Logged Out Successfully";
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default userSlice.reducer;
