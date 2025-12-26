import { createGroup, findGroup } from "@/api/service/group/group-service";
import type { IRequestGroup, IResponceGroup } from "@/types/type";
import { create } from "zustand";

export const useGroupStore = create<{
  groups: IResponceGroup[];
  loadGroups: () => Promise<void>;
  createGroup: (data: IRequestGroup) => Promise<void>;
}>((set, get) => ({
  groups: [],

  loadGroups: async () => {
    const data = await findGroup();
    set({ groups: data });
  },

  createGroup: async (data: IRequestGroup) => {
    const newGroup = await createGroup(data);

    set({ groups: [...get().groups, newGroup] });
  },
}));
