"use client";

import * as React from "react";
import {
  Book,
  BookPlus,
  Frame,
  House,
  HousePlus,
  LibraryBig,
  LucideIcon,
  NotebookPen,
  User,
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
import { useLocale } from "next-intl";

type FilteredRoute = {
  name: string;
  url: string;
  icon: LucideIcon;
  permission: Permission;
};
type user = {
  name: string;
  email: string;
  avatar: string;
};

// This is sample data.

const data: {
  user: user;
  routes: FilteredRoute[];
} = {
  user: {
    name: "safwan",
    email: "safwanmabdo@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
  routes: [
    {
      name: "Overview",
      url: "/dashboard",
      icon: Frame,
      permission: "property.read",
    },
    {
      name: "Properties",
      url: "/dashboard/properties",
      icon: House,
      permission: "property.read",
    },
    {
      name: "Create New Property",
      url: "/dashboard/properties/create",
      icon: HousePlus,
      permission: "property.write",
    },
    {
      name: "Blog Posts",
      url: "/dashboard/blog-posts",
      icon: LibraryBig,
      permission: "blogpost.read",
    },
    {
      name: "Create Blog Posts",
      url: "/dashboard/blog-posts/create",
      icon: NotebookPen,
      permission: "blogpost.write",
    },
    {
      name: "Users",
      url: "/dashboard/users",
      icon: Users,
      permission: "user.read",
    },
    {
      name: "Create Users",
      url: "/dashboard/users/create",
      icon: UserPlus,
      permission: "user.write",
    },
  ],
};


export function DashboardSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const locale = useLocale();
  const {can} = useCan()
  
  const filteredRoutes = data.routes.filter((route) => {
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
        <DashboardNavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
