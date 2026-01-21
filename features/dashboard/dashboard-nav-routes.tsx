"use client";

import { type LucideIcon } from "lucide-react";

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { Permission } from "@/constants/permissions";
import {Link as NextIntlLink} from "@/i18n/navigation"

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
  const { isMobile } = useSidebar();
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarMenu>
        {projects.map((item) => (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton asChild>
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
