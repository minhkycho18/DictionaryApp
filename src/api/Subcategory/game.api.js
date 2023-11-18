import http from "../../helpers/http";

export const getVocabsByGameType = (wordListId, subcategoryId, gameType) => {
  return http.get(
    `/wordlists/${wordListId}/subcategories/${subcategoryId}/${gameType}`
  );
};

export const updateVocabsByGameType = (
  wordListId,
  subcategoryId,
  gameType,
  values
) => {
  return http.patch(
    `/wordlists/${wordListId}/subcategories/${subcategoryId}/${gameType}`,
    values
  );
};
