import http from "../helper/http";
export const getVocalByKeyWord = (query) => {
  return http.get(`/vocabs?offset=0&keyword=${query}`);
};
export const getAllPartOfSpeech = () => {
  return http.get(`vocabs/pos`);
}
