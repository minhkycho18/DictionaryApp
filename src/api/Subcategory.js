import http from "../helper/http";

export const getAllSubCategory = (id) => {
    return http.get(`/wordlists/${id}/subcategories`);
};
export const getAllWordOfSub = (wordlistId, subId) => {
    return http.get(`/wordlists/${wordlistId}/subcategories/${subId}`);
}
export const addWordDefaultToSub = (wordlistId, subId, data) => {
    return http.post(`/wordlists/${wordlistId}/subcategories/${subId}`, data);
}
export const createNewSub = (wordlistId, data) => {
    return http.post(`/wordlists/${wordlistId}/subcategories`, data);
}
export const deleteWordInSub = (wordlistId, subId, data) => {
    return http.delete(`/wordlists/${wordlistId}/subcategories/${subId}`, data);
}

export const getAllVocabOfSubCategory = (wordlistid, subcategoryid) => {
    return http.get(`/wordlists/${wordlistid}/subcategories/${subcategoryid}`);
};

export const deleteSubCategory = (wordlistid, subcategoryid) => {
    return http.delete(`/wordlists/${wordlistid}/subcategories`, [subcategoryid]);
};