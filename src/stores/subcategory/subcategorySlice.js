import { createSlice } from "@reduxjs/toolkit";
import {
  addWordToSubcategory,
  createSubcategory,
  deleteSubcategory,
  deleteVocabulariesInSubCategory,
  getAllVocabInSubcategory,
  getSubcategory,
  updateSubcategory,
} from "./subcategoryThunk";

const initialState = {
  loading: false,
  currentPage: 1,
  totalElements: 0,
  VocabLoading: false,
  error: null,
  subcategories: [],
  selectedWL: {},
  selectedSub: {},
  messageDel: "",
  vocabInSub: [],
  messageDelVocab: "",
};

const subcategorySlice = createSlice({
  name: "subcategory",
  initialState,
  reducers: {
    deleteASub: (state, action) => {
      const newSubs = state.subcategories.filter(
        (sub) =>
          sub.subcategoryId !== action.payload.SubId[0] &&
          sub.wordListId !== action.payload.wordListId
      );
      state.subcategories = newSubs;
    },
    selectWl: (state, action) => {
      state.selectedWL = action.payload;
    },
    selectSub: (state, action) => {
      state.selectedSub = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      //=====================================================
      .addCase(getSubcategory.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSubcategory.fulfilled, (state, action) => {
        state.loading = false;
        state.subcategories = action.payload;
      })
      .addCase(getSubcategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.detail;
      })
      //=====================================================
      .addCase(createSubcategory.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createSubcategory.fulfilled, (state, action) => {
        state.loading = false;
        state.subcategories.push(action.payload);
      })
      .addCase(createSubcategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.detail;
      })
      //=====================================================update subcategory patch title
      .addCase(updateSubcategory.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSubcategory.fulfilled, (state, action) => {
        state.loading = false;
        let index = state.subcategories.findIndex(
          (el) => el.subcategoryId === action.payload.subcategoryId
        );
        if (index !== -1) {
          state.subcategories[index].title = action.payload.title;
        }
      })
      .addCase(updateSubcategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.detail;
      })
      //======================================================
      .addCase(deleteSubcategory.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSubcategory.fulfilled, (state, action) => {
        state.loading = false;
        state.messageDel = action.payload;
      })
      .addCase(deleteSubcategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.detail;
      })
      //=====================================================
      .addCase(addWordToSubcategory.fulfilled, (state, action) => {
        state.vocabInSub.push(action.payload);
      })
      //=====================================================

      .addCase(getAllVocabInSubcategory.pending, (state, action) => {
        state.VocabLoading = true;
        state.error = null;
      })
      .addCase(getAllVocabInSubcategory.fulfilled, (state, action) => {
        state.VocabLoading = false;
        state.vocabInSub = action.payload.content;
        state.currentPage = action.payload.pageable.pageNumber + 1;
        state.totalElements = action.payload.totalElements;
      })
      .addCase(getAllVocabInSubcategory.rejected, (state, action) => {
        state.VocabLoading = false;
        state.error = action.payload.detail;
      })
      //=====================================================

      .addCase(deleteVocabulariesInSubCategory.pending, (state, action) => {
        // state.VocabLoading = true;
        state.error = null;
      })
      .addCase(deleteVocabulariesInSubCategory.fulfilled, (state, action) => {
        // state.VocabLoading = false;
        state.messageDelVocab = action.payload;
      })
      .addCase(deleteVocabulariesInSubCategory.rejected, (state, action) => {
        state.VocabLoading = false;
        state.error = action.payload.detail;
      }),
});

export const { selectWl, selectSub, deleteASub, deleteVocabs } =
  subcategorySlice.actions;

export default subcategorySlice.reducer;
