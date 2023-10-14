import { createSlice } from "@reduxjs/toolkit";
import {
  createNewWL,
  deleteExistWordList,
  getAllWordListsById,
  getWordListsDefault,
  getWordListsPublic,
} from "./wordLists-thunk";

const wordListsSlice = createSlice({
  name: "wordLists",
  initialState: {
    loading: false,
    error: null,
    wordLists: [],
    wordListsPublic: [],
    wordListsDefault: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllWordListsById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllWordListsById.fulfilled, (state, action) => {
        state.loading = false;
        state.wordLists = action.payload;
      })
      .addCase(getAllWordListsById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.detail;
      })
      //==========================================================
      .addCase(getWordListsDefault.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getWordListsDefault.fulfilled, (state, action) => {
        state.loading = false;
        state.wordListsDefault = action.payload;
      })
      .addCase(getWordListsDefault.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.detail;
      })
      //==========================================================
      .addCase(getWordListsPublic.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getWordListsPublic.fulfilled, (state, action) => {
        state.loading = false;
        state.wordListsDefault = action.payload;
      })
      .addCase(getWordListsPublic.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.detail;
      })
      //==========================================================
      .addCase(getWordListsPublic.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getWordListsPublic.fulfilled, (state, action) => {
        state.loading = false;
        state.wordListsDefault = action.payload;
      })
      .addCase(getWordListsPublic.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.detail;
      })
      //==========================================================
      .addCase(createNewWL.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createNewWL.fulfilled, (state, action) => {
        state.loading = false;
        state.wordLists.push(action.payload);
      })
      .addCase(createNewWL.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.detail;
      })
      //==========================================================
      .addCase(deleteExistWordList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteExistWordList.fulfilled, (state, action) => {
        state.loading = false;
        // state.wordLists.filter((worldlis))
      })
      .addCase(deleteExistWordList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.detail;
      });
  },
});

// export const {} = wordListsSlice.actions;

export default wordListsSlice.reducer;
