import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createNewWordLists,
  deleteWordLists,
  getDefault,
  getPublic,
  getWordListById,
  updateWordLists,
} from "../../api/WordLists/word-lists.api";

export const getAllWordListsById = createAsyncThunk(
  "profile/getAllWordListsById",
  async (userData, thunkApi) => {
    try {
      const response = await getWordListById();
      return response;
    } catch (error) {
      throw thunkApi.rejectWithValue(error);
    }
  }
);
export const getWordListsDefault = createAsyncThunk(
  "profile/getWordListsDefault",
  async (userData, thunkApi) => {
    try {
      const response = await getDefault();
      return response;
    } catch (error) {
      throw thunkApi.rejectWithValue(error);
    }
  }
);
export const getWordListsPublic = createAsyncThunk(
  "profile/getWordListsPublic",
  async (userData, thunkApi) => {
    try {
      const response = await getPublic();
      return response;
    } catch (error) {
      throw thunkApi.rejectWithValue(error);
    }
  }
);
export const createNewWL = createAsyncThunk(
  "profile/createNewWL",
  async (wordListsData, thunkApi) => {
    try {
      const response = await createNewWordLists(wordListsData);
      return response;
    } catch (error) {
      throw thunkApi.rejectWithValue(error);
    }
  }
);
export const updateWl = createAsyncThunk(
  "profile/updateWl",
  async (id, thunkApi) => {
    try {
      const response = await updateWordLists(id);
      return response;
    } catch (error) {
      throw thunkApi.rejectWithValue(error);
    }
  }
);
export const deleteExistWordList = createAsyncThunk(
  "profile/deleteExistWordList",
  async (id, thunkApi) => {
    try {
      const response = await deleteWordLists(id);
      return response;
    } catch (error) {
      throw thunkApi.rejectWithValue(error);
    }
  }
);
