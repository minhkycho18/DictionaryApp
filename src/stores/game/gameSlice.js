// authSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { getVocabsByGame, updateVocabsByGame } from "./gameThunk";

// Create the auth slice
const gameSlice = createSlice({
  name: "game",
  initialState: {
    result: [],
    loading: false,
    error: null,
    messageUpdated: null,
    isReview: false,
    isFlashcard: false,
    isQuiz: false,
    isSpelling: false,
  },
  reducers: {
    updateVocab(state, action) {
      // const initResult = [...state.result];
      // const index = initResult.findIndex(
      //   (item) =>
      //     item.vocabId === action.payload.vocabId &&
      //     item.defId === action.payload.defId
      // );
      // if (index !== -1) {
      //   initResult[index] = action.payload;
      // }
      // state.result = initResult;
    },
    getGameStatus(state, action) {
      state.isReview = action.payload.every((item) => item?.isReview === true);
      state.isFlashcard = action.payload.every(
        (item) => item?.isFlashcard === true
      );
      state.isQuiz = action.payload.every((item) => item?.isQuiz === true);
      state.isSpelling = action.payload.every(
        (item) => item?.isSpelling === true
      );
      console.log(
        state.isReview,
        state.isFlashcard,
        state.isQuiz,
        state.isSpelling
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getVocabsByGame.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getVocabsByGame.fulfilled, (state, action) => {
        state.loading = false;
        state.result = action.payload;
      })
      .addCase(getVocabsByGame.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.detail;
      })
      .addCase(updateVocabsByGame.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateVocabsByGame.fulfilled, (state, action) => {
        state.loading = false;
        state.messageUpdated = action.payload;
      })
      .addCase(updateVocabsByGame.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.detail;
      });
  },
});
export const { updateVocab, getGameStatus } = gameSlice.actions;
export default gameSlice.reducer;
