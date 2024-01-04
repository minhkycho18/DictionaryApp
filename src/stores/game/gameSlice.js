import { createSlice } from "@reduxjs/toolkit";
import { getVocabsByGame } from "./gameThunk";

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
    correctFlashcard: { correct: [], total: 0, incorrect: [] },
    correctQuiz: { correct: [], total: 0, incorrect: [] },
    correctSpelling: { correct: [], total: 0, incorrect: [] },
    reviewed: [],
  },
  reducers: {
    updateVocab(state, action) {
      if (state.reviewed) {
        const index = state.reviewed.findIndex(
          (item) =>
            item.vocabId === action.payload.vocabId &&
            item.defId === action.payload.defId
        );
        if (index === -1) {
          state.reviewed.push(action.payload);
        }
      } else state.reviewed.push(action.payload);
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
    },
    setCorrectAnswer(state, action) {
      switch (action.payload.type) {
        case "quiz":
          state.correctQuiz.correct = action.payload.correctCount;
          state.correctQuiz.total = action.payload.total;
          state.correctQuiz.incorrect = action.payload.incorrect;

          break;
        case "flashcard":
          state.correctFlashcard.correct = action.payload.correctCount;
          state.correctFlashcard.total = action.payload.total;
          state.correctFlashcard.incorrect = action.payload.incorrect;

          break;
        case "spelling":
          state.correctSpelling.correct = action.payload.correctCount;
          state.correctSpelling.total = action.payload.total;
          state.correctSpelling.incorrect = action.payload.incorrect;

          break;
        default:
          break;
      }
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
      });
    // .addCase(updateVocabsByGame.pending, (state, action) => {
    //   state.loading = true;
    //   state.error = null;
    // })
    // .addCase(updateVocabsByGame.fulfilled, (state, action) => {
    //   state.loading = false;
    //   state.messageUpdated = action.payload;
    // })
    // .addCase(updateVocabsByGame.rejected, (state, action) => {
    //   state.loading = false;
    //   state.error = action.payload.detail;
    // });
  },
});
export const { updateVocab, getGameStatus, setCorrectAnswer } =
  gameSlice.actions;
export default gameSlice.reducer;
