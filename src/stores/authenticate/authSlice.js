// authSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { signInUser, signUpUser } from "./authThunk";

// Create the auth slice
const authSlice = createSlice({
  name: "auth",
  initialState: {
    userInformation: null,
    loading: false,
    error: null,
  },
  reducers: {
    logOut: (state) => {
      state.userInformation = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUpUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userInformation = action.payload;
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.detail;
      })
      //======================================================
      .addCase(signInUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        state.loading = false;
        // console.log(action.payload);
        state.userInformation = action.payload;
      })
      .addCase(signInUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.detail;
      });
  },
});
export const { logOut } = authSlice.actions;
export default authSlice.reducer;
