// hooks/useHasPermission.ts
import { usePermissions } from "./usePermissions"

export function useHasPermission(userId: string, required: string | string[]) {
  const { data: permissions, isLoading, isError } = usePermissions(userId)

  if (isLoading) return { allowed: false, loading: true }
  if (isError || !permissions) return { allowed: false, loading: false }

  const requiredArray = Array.isArray(required) ? required : [required]
  const grantedPermissions = permissions.filter(p => p.granted).map(p => p.name)

  const allowed = requiredArray.every(r => grantedPermissions.includes(r))

  return { allowed, loading: false }
}
