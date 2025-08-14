import { create } from "zustand"
import {
  Client,
  getClients as fetchAllClients,
  addClient as apiAddClient,
  updateClient as apiUpdateClient,
  deleteClient as apiDeleteClient,
} from "@/services/clientServices" // ✅ Make sure path is correct

interface ClientStore {
  clients: Client[]
  loading: boolean
  error: string | null
  fetchClients: () => Promise<void>
  addClient: (client: Omit<Client, "id" | "created_at" | "updated_at">) => Promise<void>
  updateClient: (id: string | number, client: Partial<Client>) => Promise<void>
  deleteClient: (id: string | number) => Promise<void>
  clearError: () => void
}

const useClientStore = create<ClientStore>((set, get) => ({
  clients: [],
  loading: false,
  error: null,

  fetchClients: async () => {
    set({ loading: true, error: null })
    try {
      const clients = await fetchAllClients()
      set({ clients, loading: false })
    } catch (err: any) {
      const message =
        err.response?.data?.message || err.message || "Failed to fetch clients"
      set({ error: message, loading: false })
    }
  },

  addClient: async (clientData: Omit<Client, "id" | "created_at" | "updated_at">) => {
    set({ loading: true, error: null })
    try {
      await apiAddClient(clientData)
      // Refetch all clients after adding
      const clients = await fetchAllClients()
      set({ clients, loading: false, error: null })
    } catch (err: any) {
      const message =
        err.response?.data?.message || err.message || "Failed to add client"
      set({ error: message, loading: false })
      throw err
    }
  },

  updateClient: async (id: string | number, data: Partial<Client>) => {
    set({ loading: true, error: null })
    try {
      await apiUpdateClient(id, data)
      // Refetch all clients after update
      const clients = await fetchAllClients()
      set({ clients, loading: false, error: null })
    } catch (err: any) {
      const message =
        err.response?.data?.message || err.message || "Failed to update client"
      set({ error: message, loading: false })
      throw err
    }
  },

  deleteClient: async (id: string | number) => {
    set({ loading: true, error: null })
    try {
      await apiDeleteClient(id)
      // Refetch all clients after deletion
      const clients = await fetchAllClients()
      set({ clients, loading: false, error: null })
    } catch (err: any) {
      const message =
        err.response?.data?.message || err.message || "Failed to delete client"
      set({ error: message, loading: false })
      throw err
    }
  },

  clearError: () => set({ error: null }),
}))

export default useClientStore
