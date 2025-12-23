import type {
  IRequestLogin,
  IRequestRefresh,
  IRequestRegister,
  IResponceLogin,
  IResponceRegister,
  User,
} from "@/types/type";
import { api } from "../../axios/interceptors";
import { urls } from "../urls";

export async function me() {
  const { data } = await api.get<User>(urls.auth.me);
  return data;
}

export async function refresh(token: string) {
  const { data } = await api.post<IRequestRefresh>(urls.auth.refresh, {
    token,
  });
  return data;
}

export async function login(body: IRequestLogin) {
  const { data } = await api.post<IResponceLogin>(urls.auth.login, body);
  return data;
}

export async function register(body: IRequestRegister) {
  const { data } = await api.post<IResponceRegister>(urls.auth.register, body);
  return data;
}

export async function logout() {
  const token = localStorage.getItem("refreshToken");

  const { data } = await api.post<string>(urls.auth.logout, { token });
  return data;
}
