import http from "../../helpers/http";

export const getSubByWlsId = (wordListId) => {
  return http.get(`/wordlists/${wordListId}/subcategories`);
  // /wordlists/1/subcategories
};
export const createSub = (params) => {
  const { wordListId, ...data } = params;
  return http.post(`/wordlists/${wordListId}/subcategories`, data);
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
