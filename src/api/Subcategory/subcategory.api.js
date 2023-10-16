import http from "../../helpers/http";

export const getSubByWlsId = (wordListId) => {
  return http.get(`/wordlists/${wordListId}/subcategories`);
  // /wordlists/1/subcategories
};
export const createSub = (wordListId) => {
  return http.post(`/wordlists/${wordListId}/subcategories`);
};
export const deleteSub = (params) => {
  const { wordListId, SubId } = params;
  return http.delete(`/wordlists/${wordListId}/subcategories/${SubId}`);
};
export const updateSub = (params) => {
  const { wordListId, SubId, RequestValue } = params;
  return http.put(
    `/wordlists/${wordListId}/subcategories/${SubId}`,
    RequestValue
  );
};
