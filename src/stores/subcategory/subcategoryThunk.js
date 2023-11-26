import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addWordToSub,
  createCustomWordInWL,
  createSub,
  deleteSub,
  deleteVocabsInSub,
  getAllVocabInSub,
  getSubByWlsId,
  getSubType,
  updateSub,
} from "../../api/Subcategory/subcategory.api";

export const getSubcategory = createAsyncThunk(
  "subcategory/getSubcategory",
  async (params, thunkAPi) => {
    try {
      const response = await getSubByWlsId(params.wordlistId, params.keyword);
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
export const addWordToSubcategory = createAsyncThunk(
  "subcategory/addWordToSubcategory",
  async (params, thunkApi) => {
    try {
      const response = await addWordToSub(params);
      return response;
    } catch (error) {
      throw thunkApi.rejectWithValue(error);
    }
  }
);
export const createCustomWord = createAsyncThunk(
  "subcategory/createCustomWord",
  async (params, thunkApi) => {
    try {
      const response = await createCustomWordInWL(params);
      return response;
    } catch (error) {
      throw thunkApi.rejectWithValue(error);
    }
  }
);
export const getTypeOfSub = createAsyncThunk(
  "subcategory/getTypeOfSub",
  async (params, thunkApi) => {
    try {
      const response = await getSubType();
      return response;
    } catch (error) {
      throw thunkApi.rejectWithValue(error);
    }
  }
);
export const getAllVocabInSubcategory = createAsyncThunk(
  "subcategory/getAllVocabInSubcategory",
  async (params, thunkApi) => {
    try {
      const response = await getAllVocabInSub(params);
      return response;
    } catch (error) {
      throw thunkApi.rejectWithValue(error);
    }
  }
);
// deleteVocabsInSub;
export const deleteVocabulariesInSubCategory = createAsyncThunk(
  "subcategory/deleteVocabulariesInSubCategory",
  async (params, thunkApi) => {
    try {
      const response = await deleteVocabsInSub(params);
      return response;
    } catch (error) {
      throw thunkApi.rejectWithValue(error);
    }
  }
);
