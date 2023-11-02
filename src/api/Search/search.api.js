import http from "../../helpers/http";

export const getSearchResultByKeyword = (keyword, offset, pos) => {
    let url = `/vocabs?keyword=${keyword}&offset=${offset}`;
    if (pos) {
        url = url + `&pos=${pos}`;
    }
    return http.get(url);
};

export const getVocabDetailByKey = (word) => {
    return http.get(`/vocabs/${word}`);
};