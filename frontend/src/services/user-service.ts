import api from "@/lib/axios";
import { destroyCookie} from "nookies";
import { saveRefreshToken, saveToken } from "@/services/token-service";
import { iCreateUserRequest, iLoginUserRequest } from "@/types/user-types";
export async function createUser({
  name,
  email,
  password,
}: iCreateUserRequest) {
  try {
    const response = await api.post("/auth/register", {
      name,
      email,
      password,
    });

    saveToken(response.data.token);
    saveRefreshToken("refreshToken", response.data.refresh_token);
    return { success: true };
  } catch (error: any) {
    return {
      success: false,
      message: error?.response?.data?.message || "Erro desconhecido",
    };
  }
}

export async function login({ email, password }: iLoginUserRequest) {
  try {
    const response = await api.post("/auth/login", {
      email,
      password,
    });

    saveToken(response.data.token);
    saveRefreshToken(response.data.refreshToken);
  } catch (error: any) {
    throw error;
  }
  window.location.href = "/home";
}


export function logout() {
  destroyCookie(null, "token");
  destroyCookie(null, "refreshToken");
  window.location.href = "/login";
}
