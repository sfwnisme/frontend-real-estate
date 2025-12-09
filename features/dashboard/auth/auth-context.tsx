"use client";

import { User } from "@/types/types";
import React, { createContext, useContext } from "react";

type AuthContextType = {
  user: Omit<User, "token"> | null;
};

const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthProvider({
  user,
  children,
}: {
  user: Omit<User, "token"> | null;
  children: React.ReactNode;
}): React.ReactNode {
  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
}
