import { createSlice } from "@reduxjs/toolkit";
import { getSearchResult } from "./searchThunk";

const initialState = {
  keyword: "",
  result: [],
  selectedMeaning: {},
};

const searchSlice = createSlice({
  name: "search",
  initialState: initialState,
  reducers: {
    setMeaningWord: (state, action) => {
      state.selectedMeaning = action.payload;
    },
    setKeyWord: (state, action) => {
      state.keyword = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getSearchResult.fulfilled, (state, action) => {
      state.result = action.payload;
    });
  },
});

export const { setMeaningWord, setKeyWord } = searchSlice.actions;

export default searchSlice.reducer;
