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
export const getDefault = () => {
  return http.get("/wordlists/default");
};
export const createNewWordLists = (data) => {
  return http.post("/wordlists", data);
};
export const deleteWordLists = (id) => {
  return http.delete(`/wordlists/${id}`);
};
export const updateWordLists = (params) => {
  const { id, ...rest } = params;
  return http.put(`/wordlists/${id}`, rest);
};
