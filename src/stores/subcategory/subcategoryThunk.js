import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createSub,
  deleteSub,
  getSubByWlsId,
  updateSub,
} from "../../api/Subcategory/subcategory.api";

export const getSubcategory = createAsyncThunk(
  "subcategory/getSubcategory",
  async (wordlistId, thunkAPi) => {
    try {
      const response = await getSubByWlsId(wordlistId);
      return response;
    } catch (error) {
      throw thunkAPi.rejectWithValue(error);
    }
  }
);

export const createSubcategory = createAsyncThunk(
  "subcategory/createSubcategory",
  async (params, thunkAPi) => {
    try {
      const response = await createSub(params);
      return response;
    } catch (error) {
      throw thunkAPi.rejectWithValue(error);
    }
  }
);
export const updateSubcategory = createAsyncThunk(
  "subcategory/updateSubcategory",
  async (params, thunkAPi) => {
    try {
      const response = await updateSub(params);
      return response;
    } catch (error) {
      throw thunkAPi.rejectWithValue(error);
    }
  }
);
export const deleteSubcategory = createAsyncThunk(
  "subcategory/deleteSubcategory",
  async (params, thunkAPi) => {
    try {
      const response = await deleteSub(params);
      return response;
    } catch (error) {
      throw thunkAPi.rejectWithValue(error);
    }
  }
);
