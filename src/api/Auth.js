import http from "../helper/http";

export const getTokenLogin = (data) => {
  return http.post("/users/authenticate", data);
};

export const Logout = (data) => {
  return http.post("/users/authenticate", data);
};

export const Register = (data) => {
  return http.post("/users/register", data);
};

export const GetInforUser = () => {
  return http.get(`/users/me`);
}

export const ChangePass = (data) => {
  return http.put('/users/password', data);
}