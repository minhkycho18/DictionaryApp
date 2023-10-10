import http from "../../helpers/http";

export const logInUser = (userData) => {
  return http.post("/users/authenticate", userData);
};
export const registerUser = (userData) => {
  console.log(userData);
  return http.post("/users/register", userData);
};
