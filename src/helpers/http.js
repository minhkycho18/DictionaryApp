import axios from "axios";
import getTokenFromStorage from "./getTokenFromStorage";
// const apiUrl = process.env.REACT_APP_API_URL;
class Http {
  constructor() {
    this.instance = axios.create({
      baseURL: "http://localhost:8080",
      name: "Dictionary App",
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });
    this.instance.interceptors.response.use(
      (response) => {
        return response.data;
      },
      ({ response }) => {
        if (response.status === 401) {
        }
        const result = { ...response.data, status: response.status };
        return Promise.reject(result);
      }
    );
    this.instance.interceptors.request.use(
      (config) => {
        const token = getTokenFromStorage();
        if (token) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error.response);
      }
    );
  }
  get(url, config = null) {
    return this.instance.get(url, config);
  }
  post(url, data, config = null) {
    return this.instance.post(url, data, config);
  }
  put(url, data, config = null) {
    return this.instance.put(url, data, config);
  }
  delete(url, data, config = null) {
    return this.instance.delete(url, {
      data,
      ...config,
    });
  }
}

const http = new Http();

export default http;
