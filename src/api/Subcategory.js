import http from "../helper/http";

export const getAllSubCategory = (id) => {
    return http.get(`/wordlists/${id}/subcategories`);
};
export const getAllWordOfSub = (wordlistId, subId, limit) => {
    return http.get(`/wordlists/${wordlistId}/subcategories/${subId}?offset=0&limit=${limit}`);
}
export const addWordDefaultToSub = (wordlistId, subId, data) => {
    return http.post(`/wordlists/${wordlistId}/subcategories/${subId}`, data);
}
export const addWordCustomToSub = (wordlistId, subId, data) => {
    return http.post(`/wordlists/${wordlistId}/subcategories/${subId}/custom`, data);
}
export const createNewSub = (wordlistId, data) => {
    return http.post(`/wordlists/${wordlistId}/subcategories`, data, {
        headers: {
            'Content-Type': "text/plain"
        }
    });
}
export const deleteWordInSub = (wordlistId, subId, data) => {
    return http.delete(`/wordlists/${wordlistId}/subcategories/${subId}`, data);
}

export const getAllVocabOfSubCategory = (wordlistid, subcategoryid, limit) => {
    return http.get(`/wordlists/${wordlistid}/subcategories/${subcategoryid}?offset=0&limit=${limit}`);
};

export const deleteSubCategory = (wordlistid, subcategoryid) => {
    return http.delete(`/wordlists/${wordlistid}/subcategories`, [subcategoryid]);
};
export const getTypeOfSub = () => {
    return http.get(`/subcategories/types`)
}
export const cloneSubcategory = (wordListId, sourceSubId, targetSubId) => {
    return http.post(`/wordlists/${wordListId}/subcategories/${sourceSubId}/clone/${targetSubId}`)
}