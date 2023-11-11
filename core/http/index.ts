import { AuthResponse } from "@modules/Auth/models/interfaces";
import axios, { AxiosRequestConfig } from "axios";

export const API_URL = "http://localhost:5000";

const api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

api.interceptors.request.use((config: AxiosRequestConfig) => {
  if (config.headers) {
    config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
    return config;
  }
});
api.interceptors.request.use(
  (config) => {
    return config;
  },
  async (err) => {
    const originalRequest = err.config;

    if (err.response.status == 401 && err.config && !err.config._isRetry) {
      originalRequest._isRetry = true;
      try {
        const response = await axios.get<AuthResponse>(
          `${API_URL}/auth/refresh`,
          { withCredentials: true }
        );
        localStorage.setItem("token", response.data.accessToken);
        return api.request(originalRequest);
      } catch (error) {
        console.log("Не авторизован");
      }
    }
    throw err;
  }
);
export default api;
