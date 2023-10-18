import { createSlice } from "@reduxjs/toolkit";
import {
  createNewWL,
  deleteExistWordList,
  getAllWL,
  getWLById,
  getWordListsDefault,
  getWordListsPublic,
  updateWl,
} from "./wordLists-thunk";

const wordListsSlice = createSlice({
  name: "wordLists",
  initialState: {
    loading: false,
    error: null,
    message: null,
    wordLists: [],
    selectedWordList: {},
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
      .addCase(getAllWL.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllWL.fulfilled, (state, action) => {
        state.loading = false;
        state.wordLists = action.payload;
      })
      .addCase(getAllWL.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.detail;
      })
      //==========================================================GetWlById
      .addCase(getWLById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getWLById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedWordList = action.payload;
      })
      .addCase(getWLById.rejected, (state, action) => {
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
      })
      //==========================================================update
      .addCase(updateWl.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateWl.fulfilled, (state, action) => {
        state.loading = false;
        const newWL = action.payload;
        let index = state.wordLists.findIndex((wl) => wl._id === newWL._id);
        if (index !== -1) {
          state.wordLists.splice(index, 1, newWL);
        } else {
          console.log("Error: Wordlist not found");
        }
      })
      .addCase(updateWl.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.detail;
      });
  },
});

export default wordListsSlice.reducer;
