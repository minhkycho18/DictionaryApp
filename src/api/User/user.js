import http from "../../helpers/http";

export const getAllUser = () => {
  return http.get("/users");
};

export const createAccount = (user) => {
  return http.post("/users", user);
};
export const lockAccount = (id) => {
  return http.post(`/users/lock?id=${id}`);
};
export const unlockAccount = (id) => {
  return http.post(`/users/unlock?id=${id}`);
};
export const updateProfile = (data) => {
  return http.patch("/users", data);
};
export const changePassword = (data) => {
  return http.put("/users/password", data);
};
