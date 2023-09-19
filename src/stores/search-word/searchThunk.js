import { createAsyncThunk } from "@reduxjs/toolkit";

export const getSearchResult = createAsyncThunk(
  "search/getSearchResult",
  async () => {
    //   const response = await getAllProducts();
    //   return response.products;
  }
);
