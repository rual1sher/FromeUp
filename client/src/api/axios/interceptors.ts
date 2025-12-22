import axios from "axios";
import { env } from "../config/env";
import { toast } from "sonner";
import { refresh } from "../service/auth/auth-servce";

export const api = axios.create({
  baseURL: env.baseUrl,
});

api.interceptors.response.use(
  (res) => res.data,
  async (error) => {
    const originalConfig = error.config;
    if (error.message === "Network Error") {
      toast.error("Network error");
      return Promise.reject(new Error("Network Error"));
    }

    const refreshToken = localStorage.getItem("refreshToken");

    if (
      refreshToken &&
      error.response?.data.message === "UNAUTHORIZED" &&
      originalConfig &&
      !originalConfig?.isRetry
    ) {
      originalConfig.isRetry = true;

      try {
        const tokens = await refresh(refreshToken);

        localStorage.setItem("accessToken", tokens.accessToken);
        localStorage.setItem("refreshToken", tokens.refreshToken);
      } catch (error) {
        console.log(error);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      }

      return api.request(originalConfig);
    }

    if (error.response?.data.message === "UNAUTHORIZED") {
      window.location.href = "/";
    }

    return Promise.reject(error);
  }
);

api.interceptors.request.use((res) => {
  const accessToken = localStorage.getItem("accessToken");
  res.headers.Authorization = `Bearer ${accessToken}`;
  return res;
});
