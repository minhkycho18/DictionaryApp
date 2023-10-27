import axios from "axios";
import { useContext } from "react";
import { API_URL } from "@env";
import { getTokenFromAsyncStorage } from "./Auth";
class Http {
  constructor() {
    this.instance = axios.create({
      baseURL: "http://192.168.1.13:8080",
      // baseURL: "http://192.168.1.140:8080", //URL Quoc Thanh
      name: "Dictionary App",
      timeout: 10000,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
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
      async (config) => {
        const token = await getTokenFromAsyncStorage();
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