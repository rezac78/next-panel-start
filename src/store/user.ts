import { create } from "zustand";
import { persist } from "zustand/middleware";
import { UserData } from "@/types/login";
export type AuthUser = {
  id: string
  email: string
  name: string
}

interface AuthState {
  user: AuthUser | null;
  setAuth: (user: AuthUser | null) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      setAuth: (user) => set({ user }),
      clearAuth: () => set({ user: null }),
    }),
    {
      name: "auth-storage",
    }
  )
);
