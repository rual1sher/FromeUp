import type { IRequestRefresh } from "@/types/type";
import { api } from "../axios/interceptors";
import { urls } from "./urls";

export async function refresh(token: string) {
  const { data } = await api.post<IRequestRefresh>(urls.auth.refresh, {
    token,
  });

  return data;
}
