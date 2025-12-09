import LoadingPage from "@/components/custom/loading-page";
import { SITE_INFO } from "@/constants/config";
import DashboardLayout from "@/features/dashboard/dashboard-layout";
import AuthProvider from "@/features/dashboard/auth/auth-context";
import { getCurrentUser } from "@/lib/requests";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import { redirect } from "next/navigation";
import React, { Suspense } from "react";
const GlobalDeleteDialog = dynamic(
  () => import("@/features/dashboard/global-delete-dialog"),
  {
    loading: () => <LoadingPage />,
  }
);

type Props = {
  children: React.ReactNode;
};

export const metadata: Metadata = {
  title: {
    template: `%s | Dashboard`,
    default: SITE_INFO.NAME,
  },
  description: "Dashboard page",
};

export default async function layout({ children }: Props) {
  const currentUser = await getCurrentUser()
  if(!currentUser.data) {
    redirect("/login");
  }
  return (
    <div className="relative">
      <AuthProvider user={currentUser?.data}>
        <DashboardLayout>{children}</DashboardLayout>
      </AuthProvider>
      <Suspense fallback={null}>
        <GlobalDeleteDialog />
      </Suspense>
    </div>
  );
}
