import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentLevel: null,
};

const leitnerSlice = createSlice({
  name: "leitner",
  initialState,
  reducers: {
    setCurrentLeitnerLevel(state, action) {
      state.currentLevel = action.payload;
    },
  },
});

export const { setCurrentLeitnerLevel } = leitnerSlice.actions;

export default leitnerSlice.reducer;
