import http from "../../helpers/http";

export const getSearchResultByKeyword = (keyword, offset, pos, limit) => {
  let url = `/vocabs?keyword=${keyword}&offset=${offset}`;
  if (pos) {
    url = url + `&pos=${pos}`;
  }
  if (limit) {
    url = url + `&limit=${limit}`;
  }
  return http.get(url);
};

export const getVocabDetailByKey = (word) => {
    return http.get(`/vocabs/${word}`);
};