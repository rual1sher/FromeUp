import { api } from "@/api/axios/interceptors";
import { urls } from "../urls";
import type { IGroup } from "@/types/type";

export async function findGroup() {
  const { data } = await api.get<IGroup[]>(urls.group.find);
  return data;
}
