import LoginFormView from "@/features/users/login-form-view";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
  alternates: {
    canonical: "/login",
  },
};

export default function page() {
  return (
    <div>
      <LoginFormView />
    </div>
  );
}
