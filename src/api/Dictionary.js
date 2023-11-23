import http from "../helper/http";
export const getVocalByKeyWord = (query, offset = 0) => {
  return http.get(`/vocabs?offset=${offset}&limit=20&keyword=${query}`);
};
export const getAllPartOfSpeech = () => {
  return http.get(`vocabs/pos`);
}
