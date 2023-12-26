import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getSearchResultByKeyword,
  getVocabDetailByKey,
} from "../../api/Search/search.api";
import {
  getAllContributionVocabs,
  getAllHistory,
} from "../../api/Vocabulary/vocabulary.api";

export const getSearchResult = createAsyncThunk(
  "search/getSearchResult",
  async (params, thunkAPi) => {
    try {
      const { keyword, offset, pos, limit } = params;
      return await getSearchResultByKeyword(keyword, offset, pos, limit);
    } catch (error) {
      throw thunkAPi.rejectWithValue(error);
    }
  }
);
export const getVocabDetail = createAsyncThunk(
  "search/getVocabDetail",
  async (keyword, thunkAPi) => {
    try {
      const response = await getVocabDetailByKey(keyword);
      return response;
    } catch (error) {
      throw thunkAPi.rejectWithValue(error);
    }
  }
);

export const getContributionVocab = createAsyncThunk(
  "search/getContributionVocab",
  async (param, thunkAPi) => {
    try {
      const response = await getAllContributionVocabs();
      return response;
    } catch (error) {
      throw thunkAPi.rejectWithValue(error);
    }
  }
);

export const getContributionHistory = createAsyncThunk(
  "search/getContributionHistory",
  async (param, thunkAPi) => {
    try {
      const response = await getAllHistory();
      return response;
    } catch (error) {
      throw thunkAPi.rejectWithValue(error);
    }
  }
);
