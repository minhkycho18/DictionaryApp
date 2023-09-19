import { configureStore } from "@reduxjs/toolkit";
import searchSlice from "./search-word/searchSlice";

const store = configureStore({
  reducer: {
    search: searchSlice,
  },
});
export default store;
