import {createAsyncThunk} from "@reduxjs/toolkit";
import {getSearchResultByKeyword, getVocabDetailByKey,} from "../../api/Search/search.api";

export const getSearchResult = createAsyncThunk(
  "search/getSearchResult",
  async (params, thunkAPi) => {
    try {
        const {keyword, offset, pos} = params;
        return await getSearchResultByKeyword(keyword, offset, pos);
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
