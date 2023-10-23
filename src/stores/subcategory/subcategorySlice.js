import { createSlice } from "@reduxjs/toolkit";
import {
  createSubcategory,
  deleteSubcategory,
  getSubcategory,
  updateSubcategory,
} from "./subcategoryThunk";

const initialState = {
  loading: false,
  error: null,
  subcategories: [],
  selectedWL: {},
  messageDel:'',
};

const subcategorySlice = createSlice({
  name: "subcategory",
  initialState,
  reducers: {
    deleteASub: (state, action) => {
      state.subcategories.filter((sub) => sub !== action.payload);
    },
    selectWl: (state, action) => {
      state.selectedWL = action.payload;
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
      //=====================================================
      .addCase(updateSubcategory.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSubcategory.fulfilled, (state, action) => {
        state.loading = false;
        state.subcategories = action.payload;
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
        const index = state.wordLists.findIndex(
          (item) => item.id === action.payload
        );

        if (index === -1) {
          state.wordLists.splice(index, 1);
          state.messageDel = action.payload;
        } else state.messageDel = null;
      })
      .addCase(deleteSubcategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.detail;
      }),
  //=====================================================
});

export const { selectWl, deleteASub } = subcategorySlice.actions;

export default subcategorySlice.reducer;
