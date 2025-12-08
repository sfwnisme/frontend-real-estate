import { UserRoles } from "@/types/types"

export type PermissionAction = "read" | "write" | "delete" | "update"
export type PermissionModel = "user" | "property" | "blogpost"
export type Permission = `${PermissionModel}.${PermissionAction}`

export const rolePermissions: Record<UserRoles, Permission[]> = {
  admin: [
    "user.read", "user.write", "user.delete", "user.update",
    "property.read", "property.write", "property.delete", "property.update",
    "blogpost.read", "blogpost.write", "blogpost.delete", "blogpost.update"
  ],
  manager: [
    "user.read", "user.write", "user.update",
    "property.read", "property.write", "property.delete", "property.update",
    "blogpost.read", "blogpost.write", "blogpost.delete", "blogpost.update"
  ],
  content: [
    "property.read", "property.write", "property.update",
    "blogpost.read", "blogpost.write", "blogpost.delete", "blogpost.update"
  ],
  view_only: ["property.read", "blogpost.read"],
}
