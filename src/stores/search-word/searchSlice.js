import { createSlice } from "@reduxjs/toolkit";
import { getSearchResult } from "./searchThunk";

const initialState = {
  keyword: "",
  result: [],
  selectedMeaning: {},
  loading: false,
  error: null,
  vocabDetails: [
    {
      id: 48279,
      word: "hello",
      pos: "noun",
      phoneUs: "/həˈləʊ/",
      phoneUk: "/həˈləʊ/",
      audioUs:
        "https://www.oxfordlearnersdictionaries.com/media/english/us_pron/h/hel/hello/hello__us_1_rr.mp3",
      audioUk:
        "https://www.oxfordlearnersdictionaries.com/media/english/uk_pron/h/hel/hello/hello__gb_1.mp3",
      definitions: [
        {
          defId: 46377,
          wordDesc: "an expression of greeting",
          examples: "Every morning they exchanged polite hellos.",
          synonyms: ["hullo"],
        },
      ],
    },
  ],
};

const searchSlice = createSlice({
  name: "search",
  initialState: initialState,
  reducers: {
    setMeaningWord: (state, action) => {
      state.selectedMeaning = action.payload;
    },
    setKeyWord: (state, action) => {
      state.keyword = action.payload;
    },
    setVocabDetails: (state, action) => {
      state.vocabDetails = state.result.filter(
        (item, index) => item.word === action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSearchResult.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSearchResult.fulfilled, (state, action) => {
        state.loading = false;
        state.result = action.payload;
      })
      .addCase(getSearchResult.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.detail;
      });
    //========================================================
    // .addCase(getVocabDetail.pending, (state, action) => {
    //   state.loading = true;
    //   state.error = null;
    // })
    // .addCase(getVocabDetail.fulfilled, (state, action) => {
    //   state.loading = false;
    //   state.vocabDetails = action.payload;
    // })
    // .addCase(getVocabDetail.rejected, (state, action) => {
    //   state.loading = false;
    //   state.error = action.payload.detail;
    // });
  },
});

export const { setMeaningWord, setKeyWord, setVocabDetails } =
  searchSlice.actions;

export default searchSlice.reducer;
