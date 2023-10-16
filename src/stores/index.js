import { configureStore } from "@reduxjs/toolkit";
import searchSlice from "./search-word/searchSlice";
import authSlice from "./authenticate/authSlice";
import profileSlice from "./user/userSlice";
import wordListsSlice from "./word-lists/wordLists-slice";
import subcategorySlice from "./subcategory/subcategorySlice";

const store = configureStore({
  reducer: {
    search: searchSlice,
    auth: authSlice,
    profile: profileSlice,
    wordLists: wordListsSlice,
    subcategory: subcategorySlice,
  },
});
export default store;
