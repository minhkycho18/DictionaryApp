import http from "../../helpers/http";

export const getSubByWlsId = (wordListId) => {
  return http.get(`/wordlists/${wordListId}/subcategories`);
};
///===========================================================================
export const createSub = (params) => {
  const { wordListId, ...data } = params;
  return http.post(`/wordlists/${wordListId}/subcategories`, data);
};
///===========================================================================
export const deleteSub = (params) => {
  const { wordListId, SubId } = params;
  return http.delete(`/wordlists/${wordListId}/subcategories`, SubId);
};
///===========================================================================
export const updateSub = (params) => {
  const { wordListId, SubId, RequestValue } = params;
  return http.put(
    `/wordlists/${wordListId}/subcategories/${SubId}`,
    RequestValue
  );
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
  const { wordListId, SubId } = params;
  return http.get(`/wordlists/${wordListId}/subcategories/${SubId}`);
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
