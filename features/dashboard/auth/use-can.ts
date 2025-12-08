"use client";
import { Permission, rolePermissions } from "@/constants/permissions";
import React, { useCallback, useMemo } from "react";
import { useAuth } from "./auth-context";
import { UserRoles } from "@/types/types";

type Props = {
  permission: Permission;
};

export default function useCan() {
  const auth = useAuth();
  const user = auth?.user;
  const userRole = user?.role;
  const permissions = useMemo(() => {
    if (!user) return [];
    return rolePermissions[userRole as UserRoles] ?? [];
  }, [user]);

  const can = useCallback(
    (permission: Permission) => {
      return permissions.includes(permission);
    },
    [permissions]
  );

  return { can };
}
