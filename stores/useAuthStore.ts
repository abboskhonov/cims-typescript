import { create } from "zustand"
import type { User } from "@/types/auth"
import api from "@/lib/api"

interface AuthState {
  user: User | null
  accessToken: string | null
  loading: boolean
  error: string | null
  setUser: (u: User | null) => void
  setToken: (token: string | null) => void
  setLoading: (v: boolean) => void
  logout: () => void
  fetchUser: () => Promise<void>
}

const STORAGE_KEY = "token"

const useAuthStore = create<AuthState>((set, get) => {
  // Init token only once (client-side only)
  let initialToken: string | null = null
  if (typeof window !== "undefined") {
    initialToken = localStorage.getItem(STORAGE_KEY)
  }

  // Stable functions
  const setUser = (user: User | null) => {
    set({ user })
  }

  const setToken = (accessToken: string | null) => {
    set({ accessToken })
    if (typeof window !== "undefined") {
      if (accessToken) {
        localStorage.setItem(STORAGE_KEY, accessToken)
      } else {
        localStorage.removeItem(STORAGE_KEY)
      }
    }
  }

  const setLoading = (loading: boolean) => {
    set({ loading })
  }

  const logout = () => {
    set({ user: null, accessToken: null })
    if (typeof window !== "undefined") {
      localStorage.removeItem(STORAGE_KEY)
    }
  }

  const fetchUser = async () => {
    set({ loading: true, error: null })
    try {
      const res = await api.get("/auth/me") // token auto-injected
      set({ user: res.data })
    } catch (e: any) {
      set({ error: e?.message || "Failed to fetch user" })
      if (e?.response?.status === 401) {
        get().logout()
      }
    } finally {
      set({ loading: false })
    }
  }

  return {
    user: null,
    accessToken: initialToken,
    loading: false,
    error: null,
    setUser,
    setToken,
    setLoading,
    logout,
    fetchUser,
  }
})

export function getAuthToken() {
  return useAuthStore.getState().accessToken
}

export default useAuthStore
