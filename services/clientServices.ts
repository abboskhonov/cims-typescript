// services/clientService.ts
import api from "@/lib/api"

// Backend response interface
export interface BackendClient {
  id: number
  full_name: string
  platform: string
  username: string
  phone_number: string
  status: string
  assistant_name: string
  notes: string
  created_at: string
  updated_at?: string
}

// Frontend interface
export interface Client {
  id: number | string
  full_name: string
  username: string
  platform: string
  phone_number: string
  status: string
  assistant_name: string
  notes: string
  created_at: string
  updated_at: string
}

// Dashboard API response
export interface DashboardResponse {
  customers: BackendClient[]
  status_stats: {
    total_customers: number
    need_to_call: number
    contacted: number
    project_started: number
    continuing: number
    finished: number
    rejected: number
  }
  status_dict: Record<string, number>
  status_percentages: Record<string, number>
  status_choices: Array<{ value: string; label: string }>
  permissions: string[]
  selected_status: string | null
}

// Transform: backend → frontend
const transformBackendToFrontend = (backend: BackendClient): Client => ({
  id: backend.id,
  full_name: backend.full_name,
  username: backend.username,
  platform: backend.platform,
  phone_number: backend.phone_number,
  status: backend.status,
  assistant_name: backend.assistant_name,
  notes: backend.notes,
  created_at: backend.created_at,
  updated_at: backend.updated_at ?? backend.created_at,
})

// Transform: frontend → backend
const transformFrontendToBackend = (client: Partial<Client>): Partial<BackendClient> => {
  const backend: Partial<BackendClient> = {}

  if (client.full_name !== undefined) backend.full_name = client.full_name
  if (client.platform !== undefined) backend.platform = client.platform
  if (client.username !== undefined) backend.username = client.username
  if (client.phone_number !== undefined) backend.phone_number = client.phone_number
  if (client.status !== undefined) backend.status = client.status
  if (client.assistant_name !== undefined) backend.assistant_name = client.assistant
  if (client.notes !== undefined) backend.notes = client.notes

  return backend
}

// GET all clients
export const getClients = async (): Promise<Client[]> => {
  const res = await api.get<DashboardResponse>("/crm/dashboard")
  return res.data.customers.map(transformBackendToFrontend)
}

// POST new client
export const addClient = async (
  data: Omit<Client, "id" | "created_at" | "updated_at">
): Promise<Client> => {
  const backendData = transformFrontendToBackend(data)

  // Ensure required fields
  if (!backendData.full_name || !backendData.platform || !backendData.username) {
    // Auto-generate username if missing
    if (!backendData.username) {
      backendData.username = (backendData.full_name || "user").toLowerCase().replace(/\s+/g, ".")
    }
    if (!backendData.full_name) throw new Error("Full name is required")
    if (!backendData.platform) throw new Error("Platform is required")
  }

  console.log("[addClient] Payload sent:", backendData)
  const res = await api.post<BackendClient>("/crm/customers", backendData)
  return transformBackendToFrontend(res.data)
}

// PUT update client
export const updateClient = async (
  id: string | number,
  data: Partial<Client>
): Promise<Client> => {
  const backendData = transformFrontendToBackend(data)
  console.log("[updateClient] Updating with:", backendData)
  const res = await api.put<BackendClient>(`/crm/customers/${id}`, backendData)
  return transformBackendToFrontend(res.data)
}

// DELETE client
export const deleteClient = async (id: string | number): Promise<void> => {
  await api.delete(`/crm/customers/${id}`)
}