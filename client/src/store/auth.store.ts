import { update } from "@/api/service/auth/auth-servce";
import type { IRequestUser, User } from "@/types/type";
import { create } from "zustand";

type AuthStore = {
  user: User | null;
  setUser: (user: User) => void;
  editUser: (user: IRequestUser, id: string) => Promise<void>;
};

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  editUser: async (user, id) => {
    await update(user, id).then((res) => set({ user: res }));
  },
}));
