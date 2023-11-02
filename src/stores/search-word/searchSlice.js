import { createSlice } from "@reduxjs/toolkit";
import { getSearchResult } from "./searchThunk";
import { addWordToSubcategory } from "../subcategory/subcategoryThunk";

const initialState = {
  keyword: "",
  result: [],
  currentPage: 1,
  totalElements: 0,
  selectedMeaning: {},
  loading: false,
  error: null,
  errorAdd: "",
  loadingAdd: false,
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
    setErrorAdd: (state, action) => {
      state.errorAdd = null;
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
        state.result = action.payload.content;
        state.currentPage = action.payload.pageable.pageNumber + 1;
        state.totalElements = action.payload.totalElements;
      })
      .addCase(getSearchResult.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.detail;
      })
      //============================================================================
      .addCase(addWordToSubcategory.pending, (state, action) => {
        state.loadingAdd = true;
        state.errorAdd = null;
      })
      .addCase(addWordToSubcategory.fulfilled, (state, action) => {
        state.loadingAdd = false;
        const newDate = action.payload;
        function updateDefinition(definition) {
          if (definition.defId === newDate.definition.defId) {
            return {
              ...definition,
              isWordOfUserWordlist: true,
            };
          }
          return definition;
        }
        const updatedSubcategories = state.vocabDetails.map((vocabDetail) => {
          if (newDate.subcategoryId === vocabDetail.subcategoryId) {
            const newDefUpdate = vocabDetail.definitions.map(updateDefinition);
            return {
              ...vocabDetail,
              definitions: [...newDefUpdate],
            };
          }
          return vocabDetail;
        });
        state.vocabDetails = updatedSubcategories;
        state.errorAdd = null;
        // console.log(updatedSubcategories);
      })

      .addCase(addWordToSubcategory.rejected, (state, action) => {
        state.loadingAdd = false;
        state.errorAdd = "Da ton tai";
      });
  },
});

export const { setMeaningWord, setKeyWord, setVocabDetails, setErrorAdd } =
  searchSlice.actions;

export default searchSlice.reducer;
