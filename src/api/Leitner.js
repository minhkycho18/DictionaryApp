import http from "../helper/http";

export const getInforBoxOfUser = () => {
    return http.get(`/leitners/levels`);
};
export const addVocalToLeitner = (data) => {
    return http.post(`/leitners`, data)
}
export const getVocabOfLeitnerLevelOfUser = (level) => {
    return http.get(`/leitners/${level}`);
};
