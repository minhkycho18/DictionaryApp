import http from "../../helpers/http";

export const getSubByWlsId = (wordListId) => {
  return http.get(`/wordlists/${wordListId}/subcategories`);
};
///===========================================================================
export const createSub = (params) => {
  const { wordListId, title } = params;
  console.log("title", title);
  return http.post(`/wordlists/${wordListId}/subcategories`, title, {
    headers: { "Content-Type": "text/json" },
  });
};
///===========================================================================
export const deleteSub = (params) => {
  const { wordListId, SubId } = params;
  return http.delete(`/wordlists/${wordListId}/subcategories`, SubId);
};
///===========================================================================
export const updateSub = (params) => {
  const { wordListId, SubId, title } = params;
  return http.patch(`/wordlists/${wordListId}/subcategories/${SubId}`, title);
};
///===========================================================================
export const addWordToSub = (params) => {
  const { wordListId, SubId, ...data } = params;
  return http.post(`/wordlists/${wordListId}/subcategories/${SubId}`, data);
};
///===========================================================================
export const createCustomWordInWL = (params) => {
  const { wordListId, SubId, ...data } = params;
  return http.post(
    `/wordlists/${wordListId}/subcategories/${SubId}/custom`,
    data
  );
};
///===========================================================================
export const getSubType = () => {
  return http.get(`/subcategories/types`);
};
///===========================================================================
export const getAllVocabInSub = (params) => {
  const { wordListId, SubId, offset, limit } = params;
  return http.get(
    `/wordlists/${wordListId}/subcategories/${SubId}?offset=${offset}&limit=${limit}`
  );
};
///===========================================================================
export const deleteVocabsInSub = (params) => {
  const { wordListId, SubId, data } = params;
  return http.delete(`/wordlists/${wordListId}/subcategories/${SubId}`, data);
};
// /wordlists/{wordListId}/subcategories/{subcategoryId}/custom
///===========================================================================
export const addCustomVocabInSub = (params) => {
  const { wordListId, SubId, data } = params;
  return http.post(
    `/wordlists/${wordListId}/subcategories/${SubId}/custom`,
    data
  );
};
