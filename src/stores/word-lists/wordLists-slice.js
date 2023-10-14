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
    message: null,
    wordLists: [],
    wordListsPublic: [],
    wordListsDefault: [],
  },
  reducers: {
    deleteWordList: (state, action) => {
      state.loading = true;
      const selectedWordList = action.payload;
      if (selectedWordList) {
        state.wordLists.filter((wordlist) => wordlist !== selectedWordList);
        state.loading = false;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      //==========================================================GetAllWl
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
      //========================================================== getDefault
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
      //==========================================================Public
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
      //==========================================================Create
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
      //==========================================================Delete
      .addCase(deleteExistWordList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteExistWordList.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase(deleteExistWordList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.detail;
      });
  },
});

export default wordListsSlice.reducer;
