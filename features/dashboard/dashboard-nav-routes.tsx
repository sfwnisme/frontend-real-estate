"use client";

import { type LucideIcon } from "lucide-react";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Permission } from "@/constants/permissions";
import { Link as NextIntlLink, usePathname } from "@/i18n/navigation";

export function DashboardNavRoutes({
  projects,
}: {
  projects: {
    name: string;
    url: string;
    icon: LucideIcon;
    permission: Permission;
  }[];
  }) {
  const pathname = usePathname()
  console.log(pathname)
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarMenu>
        {projects.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton asChild isActive={pathname === item.url}>
              <NextIntlLink href={item.url}>
                <item.icon />
                <span>{item.name}</span>
              </NextIntlLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
