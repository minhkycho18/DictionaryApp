import http from "../../helpers/http";

export const getVocabsByGameType = (wordListId, subcategoryId, gameType) => {
  return http.get(
    `/wordlists/${wordListId}/subcategories/${subcategoryId}/${gameType}`
  );
};

export const updateVocabsByGameType = (params) => {
  const { wordListId, subcategoryId, gameType, values } = params;
  console.log(params);
  return http.patch(
    `/wordlists/${wordListId}/subcategories/${subcategoryId}/${gameType}`,
    values
  );
};
