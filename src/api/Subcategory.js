import http from "../helper/http";

export const getAllSubCategory = (id) => {
    return http.get(`/wordlists/${id}/subcategories`);
};