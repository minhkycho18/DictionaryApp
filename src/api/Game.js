import http from "../helper/http";

export const getGameFromSub = (wordlistId, subId, typeGame) => {
    return http.get(`/wordlists/${wordlistId}/subcategories/${subId}/${typeGame}`);
};
export const updateStatusGame = (wordlistId, subId, typeGame, data) => {
    return http.patch(`/wordlists/${wordlistId}/subcategories/${subId}/${typeGame}`, data);
};  