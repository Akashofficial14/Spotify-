import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../config/axiosInstance";
// import axiosInstance from "../utils/axiosInstance"; // Make sure this path points to your axios instance setup

// 1. Asynchronous Thunk to call the backend logout API endpoint
export const handleBackendLogout = createAsyncThunk(
  "auth/handleBackendLogout",
  async (_, { rejectWithValue }) => {
    try {
      // 1. Fetch the token from localStorage right before sending the request
      const token = localStorage.getItem("token");

      const res = await axiosInstance.post(
        "/auth/logout",
        {}, // Empty body
        {
          withCredentials: true, // For cookies if your backend uses them
          headers: {
            // 2. Attach the token to the headers so your auth middleware finds it
            Authorization: `Bearer ${token}`, 
          },
        }
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Logout failed");
    }
  }
);

let authSlice = createSlice({
  name: "authdata",
  initialState: {
    loginUserData: JSON.parse(localStorage.getItem("logindata")) || null,
    regUserData: JSON.parse(localStorage.getItem("regdata")) || [],
    logout: false,
  },
  reducers: {
    setRegUser: (state, action) => {
      state.regUserData = action.payload;
    },
    setLoginUser: (state, action) => {
      state.loginUserData = action.payload;
    },
    // This stays here to toggle the UI confirmation popup visibility if clicked
    LogoutFn: (state) => {
      state.logout = !state.logout;
    },
    // Local fallback reset cleaner if ever needed
    logoutresetFn: (state) => {
      state.loginUserData = null;
      state.logout = false;
      localStorage.removeItem("logindata");
      localStorage.removeItem("token");
    },
  },
  // 2. Extra Reducers to clear everything dynamically after the backend clears your token cookie
  extraReducers: (builder) => {
    builder
      .addCase(handleBackendLogout.fulfilled, (state) => {
        // Clear all localized user artifacts from physical browser storage
        localStorage.removeItem("logindata");
        localStorage.removeItem("token");

        // Wipe global frontend state structures safely
        state.loginUserData = null;
        state.logout = false;
      })
      .addCase(handleBackendLogout.rejected, (state, action) => {
        console.error("Backend logout sequence failed: ", action.payload);
      });
  },
});

export const { setLoginUser, setRegUser, LogoutFn, logoutresetFn } = authSlice.actions;
export default authSlice.reducer;