import http from "../../helpers/http";

export const getSelfProfile = () => {
  return http.get("/users/me");
};
