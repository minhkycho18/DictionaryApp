import { createAsyncThunk } from "@reduxjs/toolkit";
import { getVocabsByGameType } from "../../api/Subcategory/game.api";

export const getVocabsByGame = createAsyncThunk(
  "game/getVocabsByGame",
  async (params, thunkAPi) => {
    try {
      const { wordlistId, subcategoryId, gameType } = params;
      const response = await getVocabsByGameType(
        wordlistId,
        subcategoryId,
        gameType
      );
      return response;
    } catch (error) {
      throw thunkAPi.rejectWithValue(error);
    }
  }
);
