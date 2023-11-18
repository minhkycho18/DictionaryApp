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
  },
  reducers: {
    updateVocab(state, action) {
      const initResult = [...state.result];
      const index = initResult.findIndex(
        (item) =>
          item.vocabId === action.payload.vocabId &&
          item.defId === action.payload.defId
      );
      if (index !== -1) {
        initResult[index] = action.payload;
      }
      state.result = initResult;
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
export const { updateVocab } = gameSlice.actions;
export default gameSlice.reducer;
