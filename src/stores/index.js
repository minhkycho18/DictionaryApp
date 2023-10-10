import { configureStore } from "@reduxjs/toolkit";
import searchSlice from "./search-word/searchSlice";
import authSlice from "./authenticate/authSlice";

const store = configureStore({
  reducer: {
    search: searchSlice,
    auth: authSlice,
  },
});
export default store;
