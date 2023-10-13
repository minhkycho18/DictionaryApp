import { createAsyncThunk } from "@reduxjs/toolkit";
import { getSelfProfile } from "../../api/User/me";

export const getUserProfile = createAsyncThunk(
  "profile/getUserProfile",
  async (userData, thunkApi) => {
    try {
      const response = await getSelfProfile();
      return response;
    } catch (error) {
      throw thunkApi.rejectWithValue(error);
    }
  }
);
