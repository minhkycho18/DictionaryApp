import http from "../helper/http";

export const getTokenLogin = (data) => {
  return http.post("/users/authenticate", data);
};

export const Logout = (data) => {
  return http.post("/users/authenticate", data);
};