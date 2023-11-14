// authSlice.js
import { createSlice } from "@reduxjs/toolkit";
import {getVocabsByGame} from "./gameThunk";

// Create the auth slice
const gameSlice = createSlice({
    name: "game",
    initialState: {
        result: [],
        loading: false,
        error: null,
    },
    reducers: {},
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
    },
});
export default gameSlice.reducer;
