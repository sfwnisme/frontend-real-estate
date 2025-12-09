import { Permission, rolePermissions } from "@/constants/permissions";
import { getCurrentUser } from "@/lib/requests";

export default async function can(permission: Permission) {
  const user = await getCurrentUser();
  if (!user.data) return false;

  const permissions = rolePermissions[user.data.role];
  return permissions?.includes(permission) ?? false;
}