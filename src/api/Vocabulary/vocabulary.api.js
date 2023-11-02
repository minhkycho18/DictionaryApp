import http from "../../helpers/http";


export const getAllPos = () => {
    return http.get(`/vocabs/pos`);
};