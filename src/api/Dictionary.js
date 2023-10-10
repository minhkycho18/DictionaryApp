import http from "../helper/http";
export const getVocalByKeyWord = (query) => {
     return http.get(`/vocabs?keyword=${query}`);
    // return http.get(`/movies.json`);
  };