// stores/dashboardStore.ts
import { create } from "zustand"
import api from "@/lib/api"

interface Statistics {
  user_count: number
  messages_count: number
  active_user_count: number
  inactive_user_count: number
}

interface DashboardState {
  statistics: Statistics
  users: any[]
  loading: boolean
  error: string | null
  lastFetched: number | null
  fetchDashboard: (force?: boolean) => Promise<void>
  reset: () => void
}

const initialStatistics: Statistics = {
  user_count: 0,
  messages_count: 0,
  active_user_count: 0,
  inactive_user_count: 0,
}

const STALE_TIME = 60_000 // 1 minute

const useDashboardStore = create<DashboardState>((set, get) => ({
  statistics: initialStatistics,
  users: [],
  loading: false,
  error: null,
  lastFetched: null,

  fetchDashboard: async (force = false) => {
    const { lastFetched } = get()
    const now = Date.now()

    // ✅ Use cached data if not stale and not forced
    if (!force && lastFetched && now - lastFetched < STALE_TIME) {
      return
    }

    set({ loading: true, error: null })
    try {
      const res = await api.get("/ceo/dashboard")
      const data = res.data
      set({
        statistics: {
          user_count: data.statistics?.user_count ?? 0,
          messages_count: data.statistics?.messages_count ?? 0,
          active_user_count: data.statistics?.active_user_count ?? 0,
          inactive_user_count: data.statistics?.inactive_user_count ?? 0,
        },
        users: Array.isArray(data.users) ? data.users : [],
        lastFetched: Date.now(),
      })
    } catch (e: any) {
      set({
        error:
          e?.response?.data?.message ||
          e?.message ||
          "Failed to load dashboard statistics",
      })
    } finally {
      set({ loading: false })
    }
  },

  reset: () => {
    set({
      statistics: initialStatistics,
      users: [],
      loading: false,
      error: null,
      lastFetched: null,
    })
  },
}))

export default useDashboardStore
