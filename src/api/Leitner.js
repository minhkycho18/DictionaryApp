import http from "../helper/http";

export const getInforBoxOfUser = () => {
    return http.get(`/leitners/levels`);
};
export const addVocalToLeitner = (data) => {
    return http.post(`/leitners`, data)
}
export const getVocabOfLeitnerLevelOfUser = (level, offset = 0) => {
    return http.get(`/leitners/${level}?offset=${offset}&limit=15`);
};
export const getDataForGame = (level) => {
    return http.get(`/leitners/levels/${level}/game`)
}
export const UpVocabLeitner = (statusLevel, data) => {
    return http.patch(`/leitners/levels/${statusLevel}`, data)
}
export const deleteVocabLeitner = (data) => {
    return http.delete(`/leitners/vocabs`, data)
}