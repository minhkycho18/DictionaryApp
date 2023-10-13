import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getSearchResultByKeyword,
  getVocabDetailByKey,
} from "../../api/Search/search.api";

export const getSearchResult = createAsyncThunk(
  "search/getSearchResult",
  async (keyword, thunkAPi) => {
    try {
      const response = await getSearchResultByKeyword(keyword);
      return response.content;
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
