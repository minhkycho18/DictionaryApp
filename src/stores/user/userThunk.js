import { createAsyncThunk } from "@reduxjs/toolkit";
import { getSelfProfile } from "../../api/User/me";
import { updateProfile } from "../../api/User/user";

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
export const updateUserProfile = createAsyncThunk(
  "profile/updateUserProfile",
  async (userData, thunkApi) => {
    try {
      const response = await updateProfile(userData);
      return response;
    } catch (error) {
      throw thunkApi.rejectWithValue(error);
    }
  }
);
