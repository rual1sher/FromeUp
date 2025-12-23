import type { User } from "@/types/type";
import { create } from "zustand";

type AuthStore = {
  user: User | null;
  setUser: (user: User) => void;
};

export const useAuth = create<AuthStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
