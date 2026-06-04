import { create } from "zustand";
import { persist } from "zustand/middleware";

export type AuthUser = {
  id: string;
  email: string;
  name: string;
};

interface AuthState {
  user: AuthUser | null;
  accessToken: string | null;
  setAuth: (accessToken: string, user?: AuthUser | null) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      setAuth: (accessToken, user = null) => set({ accessToken, user }),
      clearAuth: () => set({ user: null, accessToken: null }),
    }),
    {
      name: "auth-storage",
    },
  ),
);
