import axios from "axios";
import { API_URL, API_KEY } from "@env";
console.log(API_URL);
class Http {
  constructor() {
    this.instance = axios.create({
      baseURL: API_URL,
      params: {
        api_key: API_KEY,
      },
      name: " Movie app",
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
