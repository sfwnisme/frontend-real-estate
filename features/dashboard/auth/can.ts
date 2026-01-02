import { Permission, rolePermissions } from "@/constants/permissions";
import { getCurrentUser } from "@/lib/actions";

export default async function can(permission: Permission) {
  const user = await getCurrentUser();
  if (!user.data) return false;

  const permissions = rolePermissions[user.data.role];
  return permissions?.includes(permission) ?? false;
}