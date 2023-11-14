import http from "../../helpers/http";

export const getVocabsByGameType = (wordListId, subcategoryId, gameType) => {
    return http.get(`/wordlists/${wordListId}/subcategories/${subcategoryId}/${gameType}`);
};