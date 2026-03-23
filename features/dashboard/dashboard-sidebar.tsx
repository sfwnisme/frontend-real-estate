"use client";

import * as React from "react";
import {
  Frame,
  House,
  HousePlus,
  LibraryBig,
  LucideIcon,
  NotebookPen,
  UserPlus,
  Users,
  Bolt
} from "lucide-react";

import { DashboardNavRoutes } from "./dashboard-nav-routes";
import { DashboardNavUser } from "./dashboard-nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import Image from "next/image";
import useCan from "./auth/use-can";
import { Permission } from "@/constants/permissions";
import { useLocale, useTranslations } from "next-intl";
import { ImageType } from "@/types/types";
import { useTheme } from "next-themes";

type FilteredRoute = {
  name: string;
  url: string;
  icon: LucideIcon;
  permission: Permission;
};

type Props = {
  logo: {
    default: ImageType | null,
    dark: ImageType | null,
  }
}

export function DashboardSidebar({
  logo,
  ...props
}: React.ComponentProps<typeof Sidebar> & Props) {
  const locale = useLocale();
  const t = useTranslations("dashboard.sidebar");
  const { can } = useCan();
  const {theme} = useTheme();
  console.log(theme);
  const logoUrl = theme === "dark" ? logo.default?.url : logo.dark?.url;
  const routes: FilteredRoute[] = [
    {
      name: t("overview"),
      url: "/dashboard",
      icon: Frame,
      permission: "property.read",
    },
    {
      name: t("properties"),
      url: "/dashboard/properties",
      icon: House,
      permission: "property.read",
    },
    {
      name: t("createProperty"),
      url: "/dashboard/properties/create",
      icon: HousePlus,
      permission: "property.write",
    },
    {
      name: t("blogPosts"),
      url: "/dashboard/blog-posts",
      icon: LibraryBig,
      permission: "blogpost.read",
    },
    {
      name: t("createBlogPost"),
      url: "/dashboard/blog-posts/create",
      icon: NotebookPen,
      permission: "blogpost.write",
    },
    {
      name: t("users"),
      url: "/dashboard/users",
      icon: Users,
      permission: "user.read",
    },
    {
      name: t("createUser"),
      url: "/dashboard/users/create",
      icon: UserPlus,
      permission: "user.write",
    },
    {
      name: t("siteInfo"),
      url: "/dashboard/site-info",
      icon: Bolt,
      permission: "siteinfo.read",
    },
  ];

  const filteredRoutes = routes.filter((route) => {
    const canSee = can(route.permission);
    if (!canSee) return null;
    return route;
  });

  return (
    <Sidebar
      collapsible="icon"
      {...props}
      side={locale === "en" ? "left" : "right"}
    >
      <SidebarHeader>
        <div className="w-full p-2">
          <Image
            className="size-12"
            src={logoUrl || "/logo.svg"}
            height={300}
            width={300}
            alt="project logo"
          />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <DashboardNavRoutes projects={filteredRoutes} />
      </SidebarContent>
      <SidebarFooter>
        <DashboardNavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
