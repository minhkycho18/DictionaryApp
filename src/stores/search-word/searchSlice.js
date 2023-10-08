import { createSlice } from "@reduxjs/toolkit";
import { getSearchResult } from "./searchThunk";

const initialState = {
  // keyword: "",
  result: [],
};

const searchSlice = createSlice({
  name: "search",
  initialState: initialState,
  reducers: {
    // setKeyword: (state, action) => {
    //   state.word = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(getSearchResult.fulfilled, (state, action) => {
      state.result = action.payload;
    });
  },
});

export const { setKeyword } = searchSlice.actions;

export default searchSlice.reducer;
