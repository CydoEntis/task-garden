import axios from "axios";

import { baseUrl } from "./endpoints";
import { ERROR_TYPES } from "./errors/error.constants";
import useAuthStore from "../stores/useAuthStore";
import localStorageService from "../services/localStorage.service";
import { refreshTokens } from "./services/auth.services";

const apiClient = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});

apiClient.interceptors.request.use((request) => {
  const token =
    useAuthStore.getState().accessToken ||
    localStorageService.getItem<{ accessToken?: string }>("taskgarden")
      ?.accessToken;
  if (token) {
    request.headers.Authorization = `Bearer ${token}`;
  }
  return request;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle server down or unreachable
    if (!error.response) {
      useAuthStore.getState().logoutUser();
      localStorageService.removeItem("taskgarden");
      window.location.href = "/login";
      return Promise.reject(
        new Error("Server unreachable. Please try again later.")
      );
    }

    // Handle 401 Unauthorized and token refresh
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const { accessToken } = await refreshTokens();
        useAuthStore.getState().setAccessToken(accessToken);

        return apiClient(originalRequest); // Retry the original request
      } catch {
        useAuthStore.getState().logoutUser();
        localStorageService.removeItem("questbound");
        window.location.href = "/login";
        return Promise.reject(
          new Error("Token refresh failed. Please log in again.")
        );
      }
    }

    // Attach formatted validation errors
    if (error.response?.status === 400) {
      return Promise.reject({
        type: ERROR_TYPES.VALIDATION_ERROR,
        errors: error.response.data.errors,
        statusCode: error.response.status,
      });
    }

    if (error.response?.status === 404) {
      const errorMessage =
        Object.values(error.response.data.errors)?.[0] || "Resource not found.";

      return Promise.reject({
        type: ERROR_TYPES.NOT_FOUND_ERROR,
        error: errorMessage,
        statusCode: error.response.status,
      });
    }

    if (error.response?.status === 409) {
      const errorMessage =
        Object.values(error.response.data.errors)?.[0] || "Resource conflict.";

      return Promise.reject({
        type: ERROR_TYPES.CONFLICT_ERROR,
        error: errorMessage,
        statusCode: error.response.status,
      });
    }

    const errorMessage =
      Object.values(error.response.data.errors)?.[0] ||
      "An unknown error occurred.";

    // Log relevant error details
    return Promise.reject({
      type: ERROR_TYPES.UNEXPECTED_ERROR,
      error: errorMessage,
      statusCode: error.response?.status,
    });
  }
);

export default apiClient;
