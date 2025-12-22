import type { IRequestLogin, IRequestRefresh } from "@/types/type";
import { api } from "../../axios/interceptors";
import { urls } from "../urls";

export async function refresh(token: string) {
  const { data } = await api.post<IRequestRefresh>(urls.auth.refresh, {
    token,
  });
  return data;
}

export async function login(body: IRequestLogin) {
  const { data } = await api.post(urls.auth.login, body);
  return data;
}

export async function logout() {
  const token = localStorage.getItem("refreshToken");

  const { data } = await api.post(urls.auth.logout, { token });
  return data;
}
