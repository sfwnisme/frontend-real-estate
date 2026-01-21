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

type FilteredRoute = {
  name: string;
  url: string;
  icon: LucideIcon;
  permission: Permission;
};

export function DashboardSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const locale = useLocale();
  const t = useTranslations("dashboard.sidebar")
  const {can} = useCan()

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
  ]
  
  const filteredRoutes = routes.filter((route) => {
    const canSee = can(route.permission);
    if (!canSee) return null;
    return route;
  });
  
  return (
    <Sidebar collapsible="icon" {...props} side={locale === "en" ? "left" : "right"}>
      <SidebarHeader>
        <div className="w-full p-2">
          <Image
            src="/logoipsum.png"
            height={300}
            width={300}
            alt="project logo"
            className="w-full"
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
