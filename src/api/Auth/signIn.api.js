import http from "../../helpers/http";

export const logInUser = (userData) => {
  return http.post("/users/authenticate", userData);
};
export const registerUser = (userData) => {
  return http.post("/users/register", userData);
};
