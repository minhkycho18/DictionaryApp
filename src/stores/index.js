import { configureStore } from "@reduxjs/toolkit";
import searchSlice from "./search-word/searchSlice";
import authSlice from "./authenticate/authSlice";
import profileSlice from "./user/userSlice";
import wordListsSlice from "./word-lists/wordLists-slice";
import subcategorySlice from "./subcategory/subcategorySlice";
import gameSlice from "./game/gameSlice";

const loadGameFromLocalStorage = () => {
  try {
    const gameSerializedState = sessionStorage.getItem("gameState");
    if (gameSerializedState === null) {
      return undefined;
    }
    return JSON.parse(gameSerializedState);
  } catch (error) {
    return undefined;
  }
};
const saveGameToLocalStorage = (state) => {
  try {
    const gameSerializedState = JSON.stringify(state.game);
    sessionStorage.setItem("gameState", gameSerializedState);
  } catch (error) {
    // Xử lý lỗi khi lưu trạng thái game
  }
};

const store = configureStore({
  reducer: {
    search: searchSlice,
    auth: authSlice,
    profile: profileSlice,
    wordLists: wordListsSlice,
    subcategory: subcategorySlice,
    game: gameSlice,
  },
  preloadedState: {
    game: loadGameFromLocalStorage(),
  },
});

store.subscribe(() => {
  saveGameToLocalStorage(store.getState());
});

export default store;
