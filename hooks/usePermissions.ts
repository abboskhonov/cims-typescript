// hooks/usePermissions.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import api from "@/lib/api" // your axios/fetch wrapper

type Permission = {
  id: string
  name: string
  granted: boolean
}

async function fetchPermissions(userId: string): Promise<Permission[]> {
  const { data } = await api.get(`/ceo/users/${userId}/permissions`)
  return data
}

async function updatePermissions(userId: string, permissions: Permission[]): Promise<Permission[]> {
  const { data } = await api.put(`/ceo/users/${userId}/permissions`, permissions)
  return data
}

export function usePermissions(userId: string) {
  const queryClient = useQueryClient()

  const permissionsQuery = useQuery({
    queryKey: ["permissions", userId],
    queryFn: () => fetchPermissions(userId),
    enabled: !!userId, // only run if userId is defined
  })

  const permissionsMutation = useMutation({
    mutationFn: (permissions: Permission[]) => updatePermissions(userId, permissions),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["permissions", userId] })
    },
  })

  return {
    ...permissionsQuery,
    updatePermissions: permissionsMutation.mutate,
    isUpdating: permissionsMutation.isPending,
  }
}
