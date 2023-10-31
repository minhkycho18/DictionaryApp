import http from "../helper/http";

export const getAllSubCategory = (id) => {
    return http.get(`/wordlists/${id}/subcategories`);
};

export const getAllVocabOfSubCategory = (wordlistid, subcategoryid) => {
    return http.get(`/wordlists/${wordlistid}/subcategories/${subcategoryid}`);
};