import http from "../helper/http";

export const getAllSubCategory = (id) => {
    return http.get(`/wordlists/${id}/subcategories`);
};

export const getAllVocabOfSubCategory = (wordlistid, subcategoryid) => {
    return http.get(`/wordlists/${wordlistid}/subcategories/${subcategoryid}`);
};

export const deleteSubCategory = (wordlistid, subcategoryid) => {
    return http.delete(`/wordlists/${wordlistid}/subcategories`, [subcategoryid]);
};