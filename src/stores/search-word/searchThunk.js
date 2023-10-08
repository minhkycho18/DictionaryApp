import { createAsyncThunk } from "@reduxjs/toolkit";
import { getSearchResultByKeyword } from "../../api/Search/search.api";

export const getSearchResult = createAsyncThunk(
  "search/getSearchResult",
  async (keyword) => {
    const response = await getSearchResultByKeyword(keyword);
    return response.content;
  }
);
