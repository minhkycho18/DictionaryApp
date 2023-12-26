import http from "../../helpers/http";

export const getSubByWlsId = (wordListId, keyword) => {
  if (!keyword) {
    return http.get(`/wordlists/${wordListId}/subcategories`);
  } else {
    return http.get(
      `/wordlists/${wordListId}/subcategories?keyword=${keyword}`
    );
  }
};
///===========================================================================
export const createSub = (params) => {
  const { wordListId, title } = params;
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
  return http.put(`/wordlists/${wordListId}/subcategories/${SubId}`, title, {
    headers: { "Content-Type": "text/json" },
  });
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
export const cloneSubcategory = (params) => {
  const { wordListId, SubId, sourceSubcategoryId } = params;
  return http.post(
    `/wordlists/${wordListId}/subcategories/${sourceSubcategoryId}/clone/${SubId}`
  );
};
///===========================================================================
export const getSubType = () => {
  return http.get(`/subcategories/types`);
};
///===========================================================================
export const getAllVocabInSub = (params) => {
  const { wordListId, SubId, offset, limit } = params;
  if (limit) {
    return http.get(
      `/wordlists/${wordListId}/subcategories/${SubId}?offset=${offset}&limit=${limit}`
    );
  } else return http.get(`/wordlists/${wordListId}/subcategories/${SubId}`);
};
///===========================================================================
export const deleteVocabsInSub = (params) => {
  const { wordListId, SubId, data } = params;
  return http.delete(`/wordlists/${wordListId}/subcategories/${SubId}`, data);
};
///===========================================================================
export const addCustomVocabInSub = (params) => {
  const { wordListId, SubId, data, isContribute } = params;

  return http.post(`/wordlists/${wordListId}/subcategories/${SubId}/custom`, {
    ...data,
    isContribute,
  });
};
