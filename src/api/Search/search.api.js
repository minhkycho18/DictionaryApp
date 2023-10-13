import http from "../../helpers/http";

export const getSearchResultByKeyword = (keyword) => {
  return http.get(`/vocabs?keyword=${keyword}`);
};

export const getVocabDetailByKey = (word) => {
  return http.get(`/vocabs/${word}`);
};