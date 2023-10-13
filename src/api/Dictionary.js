import http from "../helper/http";
export const getVocalByKeyWord = (query) => {
  return http.get(`/vocabs?keyword=${query}`);
};

export const getDetailVocal = (query) => {
  return http.get(`/vocabs/${query}`);
};