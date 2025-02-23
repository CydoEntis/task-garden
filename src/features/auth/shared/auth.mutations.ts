import { useMutation } from "@tanstack/react-query";
import useAuthStore from "../../../stores/useAuthStore";
import {
  AuthenticatedResponse,
  DecodedToken,
  LoginRequest,
} from "./auth.types";
import { loginUser } from "../../../api/services/auth.services";
import { notifications } from "@mantine/notifications";
import localStorageService from "../../../services/localStorage.service";
import { jwtDecode } from "jwt-decode";

export function useLogin() {
  return useMutation({
    mutationFn: async (
      credentials: LoginRequest
    ): Promise<AuthenticatedResponse> => {
      return await loginUser(credentials);
    },
    onSuccess: (data) => {
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
        color: "green",
        position: "top-right",
      });
    },
    onError: (error: Error) => {
      notifications.show({
        title: "Login Failed",
        message: "Something went wrong!",
        color: "red",
        position: "top-right",
      });
      throw error;
    },
  });
}

// export function useRegister() {
//   const { loginUser } = useAuthStore();
//   const { setUserId } = useUserStore();

//   return useMutation({
//     mutationFn: async (
//       credentials: RegisterRequest
//     ): Promise<AuthenticatedResponse> => {
//       return await authService.registerUser(credentials);
//     },
//     onSuccess: (data) => {
//       loginUser();
//       setUserId(data.userId);
//       const questbound = { isAuthenticated: true, userId: data.userId };

//       localStorageService.setItem("questbound", questbound);

//       notifications.show({
//         title: "Success",
//         message: data.message,
//         color: "green",
//         position: "top-right",
//       });
//     },
//     onError: (error: Error) => {
//       notifications.show({
//         title: "Login Failed",
//         message: "Something went wrong!",
//         color: "red",
//         position: "top-right",
//       });
//       throw error;
//     },
//   });
// }
