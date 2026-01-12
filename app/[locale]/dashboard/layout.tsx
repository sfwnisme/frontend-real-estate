import LoadingPage from "@/components/custom/loading-page";
import DashboardLayout from "@/features/dashboard/dashboard-layout";
import AuthProvider from "@/features/dashboard/auth/auth-context";
import { getCurrentUser } from "@/lib/actions";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import { redirect } from "next/navigation";
import React, { Suspense } from "react";
import { getTranslations } from "next-intl/server";
const GlobalDeleteDialog = dynamic(
  () => import("@/features/dashboard/global-delete-dialog"),
  {
    loading: () => <LoadingPage />,
  }
);

type Props = {
  children: React.ReactNode;
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const locale = (await params).locale
  const t = await getTranslations("SiteConfig")
  const DASHBOARD_TITLE = t("dashboard.title")
  const DASHBOARD_DESCRIPTION = t("dashboard.description")
  const SITE_NAME = t("name")
  const PAGE_TITLE = `${SITE_NAME} - ${DASHBOARD_TITLE}`
  const PAGE_TEMPLATE_AR = `${PAGE_TITLE} | %s`
  const PAGE_TEMPLATE_EN = `%s | ${PAGE_TITLE}`
  const PAGE_TEMPLATE = locale === "ar" ? PAGE_TEMPLATE_AR : PAGE_TEMPLATE_EN
  return {
    title: {
      template: PAGE_TEMPLATE,
      default: PAGE_TITLE,
    },
    description: DASHBOARD_DESCRIPTION,
  }
}

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
