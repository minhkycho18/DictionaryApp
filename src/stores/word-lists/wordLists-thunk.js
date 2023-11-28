import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createNewWordLists,
  deleteWordLists,
  getAllWordLists,
  getDefault,
  getPublic,
  getWordListById,
  updateWordLists,
} from "../../api/WordLists/word-lists.api";

export const getAllWL = createAsyncThunk(
  "wordLists/getAllWL",
  async (userData, thunkApi) => {
    try {
      const response = await getAllWordLists();
      return response;
    } catch (error) {
      throw thunkApi.rejectWithValue(error);
    }
  }
);
export const getWLById = createAsyncThunk(
  "wordLists/getWLById",
  async (id, thunkApi) => {
    try {
      const response = await getWordListById(id);
      return response;
    } catch (error) {
      throw thunkApi.rejectWithValue(error);
    }
  }
);
export const getWordListsDefault = createAsyncThunk(
  "wordLists/getWordListsDefault",
  async (keyword, thunkApi) => {
    try {
      const response = await getDefault(keyword);
      return response;
    } catch (error) {
      throw thunkApi.rejectWithValue(error);
    }
  }
);
export const getWordListsPublic = createAsyncThunk(
  "wordLists/getWordListsPublic",
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
  "wordLists/createNewWL",
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
  "wordLists/updateWl",
  async (params, thunkApi) => {
    try {
      const response = await updateWordLists(params);
      return response;
    } catch (error) {
      throw thunkApi.rejectWithValue(error);
    }
  }
);
export const deleteExistWordList = createAsyncThunk(
  "wordLists/deleteExistWordList",
  async (id, thunkApi) => {
    try {
      const response = await deleteWordLists(id);
      return response;
    } catch (error) {
      throw thunkApi.rejectWithValue(error);
    }
  }
);
