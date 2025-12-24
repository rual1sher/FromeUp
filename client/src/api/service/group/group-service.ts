import { api } from "@/api/axios/interceptors";
import { urls } from "../urls";
import type { IRequestGroup, IResponceGroup } from "@/types/type";

export async function findGroup() {
  const { data } = await api.get<IResponceGroup[]>(urls.group.find);
  return data;
}

export async function createGroup(group: IRequestGroup) {
  const { data } = await api.post<IResponceGroup>(urls.group.create, group);
  return data;
}
