import http from "../../helpers/http";

export const getAllPos = () => {
  return http.get(`/vocabs/pos`);
};

export const getAllContributionVocabs = () => {
  return http.get(`/vocabs/contribution`);
};

export const getAllHistory = () => {
  return http.get(`/managements/history`);
};

export const updateDefaultVocab = (vocabId, data) => {
  return http.put(`http://localhost:8080/managements/vocabs/${vocabId}`, data);
};

export const reviewDefaultVocab = (vocabId, data) => {
  return http.put(
    `http://localhost:8080/managements/vocabs/${vocabId}/review`,
    data
  );
};

export const deleteDefaultVocab = (vocabId) => {
  return http.delete(`http://localhost:8080/managements/vocabs/${vocabId}`);
};
