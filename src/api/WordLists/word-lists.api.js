import http from "../../helpers/http";

export const getWordListById = () => {
  return http.get("/wordlists");
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
export const updateWordLists = (id) => {
  return http.put(`/wordlists/${id}`);
};
