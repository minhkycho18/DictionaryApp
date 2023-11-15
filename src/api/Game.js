import http from "../helper/http";

export const getGameFromSub = (wordlistId, subId, typeGame) => {
    return http.get(`/wordlists/${wordlistId}/subcategories/${subId}/${typeGame}`);
};