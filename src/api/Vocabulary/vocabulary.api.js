import http from "../../helpers/http";


export const getAllPos = () => {
    return http.get(`/vocabs/pos`);
};

export const updateDefaultVocab = (vocabId, data) => {
    return http.put(`http://localhost:8080/managements/vocabs/${vocabId}`,data);
};

export const deleteDefaultVocab = (vocabId) => {
    return http.delete(`http://localhost:8080/managements/vocabs/${vocabId}`);
};