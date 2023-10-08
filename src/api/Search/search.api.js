import http from "../../helpers/http";

export const getSearchResultByKeyword = (keyword) => {
  return http.get(`/vocabs?keyword=${keyword}`);
};
