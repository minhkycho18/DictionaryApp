import http from "../helper/http";

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
export const updateWordLists = (id, data) => {
    return http.put(`/wordlists/${id}`, data);
};
export const getWordListByWordlistId = (id) => {
    return http.get(`/wordlists/${id}`);
};
export const cloneWordlist = (wordlistId) => {
    return http.post(`/wordlists/${wordlistId}`);
};