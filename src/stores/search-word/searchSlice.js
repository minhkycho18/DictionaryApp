import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  word: "",
  result: {},
};

const searchSlice = createSlice({
  name: "search",
  initialState: initialState,
  reducers: {
    searchByWord: (state, action) => {
      state.word = action.payload;
    },
  },
  // extraReducers: (builder) => {builder.addCase()},
});

export const { searchByWord } = searchSlice.actions;

export default searchSlice.reducer;
