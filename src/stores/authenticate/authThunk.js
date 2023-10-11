import { createAsyncThunk } from "@reduxjs/toolkit";
import { logInUser, registerUser } from "../../api/Auth/signIn.api";

export const signUpUser = createAsyncThunk(
  "auth/signUpUser",
  async (userData, thunkApi) => {
    try {
      const response = await registerUser(userData);
      return response;
    } catch (error) {
      throw thunkApi.rejectWithValue(error);
    }
  }
);

// Async action to log in a user
export const signInUser = createAsyncThunk(
  "auth/signInUser",
  async (userData, thunkApi) => {
    try {
      const response = await logInUser(userData);
      return response;
    } catch (error) {
      throw thunkApi.rejectWithValue(error);
    }
  }
);
