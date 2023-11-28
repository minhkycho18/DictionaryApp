import http from "../../helpers/http";

export const getAllWordLists = () => {
  return http.get("/wordlists");
};
export const getWordListById = (id) => {
  return http.get(`/wordlists/${id}`);
};
export const getPublic = () => {
  return http.get("/wordlists/public");
};
export const getWordListTypes = () => {
  return http.get("/wordlists/types");
};
export const getDefault = (keyword) => {
  if (keyword == null) {
    return http.get("/wordlists/default");
  } else {
    return http.get(`/wordlists/default?keyword=${keyword}`);
  }
};
export const createNewWordLists = (data) => {
  return http.post("/wordlists", data);
};
export const cloneWordLists = (data) => {
  return http.post(`/wordlists/${data}`);
};
export const deleteWordLists = (id) => {
  return http.delete(`/wordlists/${id}`);
};
export const updateWordLists = (params) => {
  const { id, ...rest } = params;
  return http.put(`/wordlists/${id}`, rest);
};
