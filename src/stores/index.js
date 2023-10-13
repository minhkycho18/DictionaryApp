import { configureStore } from "@reduxjs/toolkit";
import searchSlice from "./search-word/searchSlice";
import authSlice from "./authenticate/authSlice";
import profileSlice from "./user/userSlice";

const store = configureStore({
  reducer: {
    search: searchSlice,
    auth: authSlice,
    profile: profileSlice,
  },
});
export default store;
