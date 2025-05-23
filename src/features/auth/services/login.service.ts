import { notifications } from "@mantine/notifications";
import { useMutation } from "@tanstack/react-query";
import { jwtDecode } from "jwt-decode";
import { apiRequest } from "../../../api/apiRequest";
import endpoints, { baseUrl } from "../../../api/endpoints";
import localStorageService from "../../../services/localStorage.service";
import useAuthStore from "../../../stores/useAuthStore";
import { AuthenticatedResponse, DecodedToken, LoginRequest } from "../shared/auth.types";

const loginUser = async (credentials: LoginRequest): Promise<AuthenticatedResponse> => {
  return apiRequest<AuthenticatedResponse>("post", `${endpoints.auth}/login`, credentials);
};

export function useLogin() {
  return useMutation({
    mutationFn: async (credentials: LoginRequest): Promise<AuthenticatedResponse> => {
      console.log(credentials);
      console.log(baseUrl);
      return await loginUser(credentials);
    },
    onSuccess: (data) => {
      console.log(data);

      const decodedToken = jwtDecode<DecodedToken>(data.accessToken);

      const taskGarden = {
        isAuthenticated: true,
        accessToken: data.accessToken,
      };

      const user = {
        id: decodedToken.userId,
        username: decodedToken.sub,
        email: decodedToken.email,
        role: "Admin",
        tokenExpiration: decodedToken.exp,
      };

      useAuthStore.getState().loginUser(user, data.accessToken);

      console.log(useAuthStore.getState().isAuthenticated);

      localStorageService.setItem("taskgarden", taskGarden);

      notifications.show({
        title: "Success",
        message: data.message,
        color: "lime",
        position: "top-right",
        className: "notification",
      });
    },
    onError: (error: Error) => {
      console.log(error);

      notifications.show({
        title: "Login Failed",
        message: "Something went wrong!",
        color: "red",
        position: "top-right",
        className: "notification",
      });
      throw error;
    },
  });
}
