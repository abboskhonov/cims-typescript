import { create } from "zustand";
import type { User } from "@/types/auth";

interface AuthState {
  user: User | null;
  accessToken: string | null;
  loading: boolean;
  setUser: (u: User | null) => void;
  setToken: (token: string | null) => void;
  logout: () => void;
  setLoading: (v: boolean) => void;
}

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  loading: false,
  setUser: (user) => set({ user }),
  setToken: (accessToken) => set({ accessToken }),
  setLoading: (loading) => set({ loading }),
  logout: () => set({ user: null, accessToken: null }),
}));

export function getAuthToken() {
  return useAuthStore.getState().accessToken;
}

export default useAuthStore;
