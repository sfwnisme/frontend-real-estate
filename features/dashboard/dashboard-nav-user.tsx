"use client";

import { ChevronsUpDown, Languages, LogOut } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { getCurrentUser } from "@/lib/actions";
import { logOut } from "../users/lib/actions";
import { Link as NextIntlLink, usePathname } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";

export function DashboardNavUser() {
  const [userData, setUserData] = useState<{
    name: string | undefined;
    email: string | undefined;
  }>({
    name: "",
    email: "",
  });
  const { isMobile } = useSidebar();
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations("navigation");

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const response = await getCurrentUser();
      if (!response?.data) {
        window.location.pathname = "/login";
      }
      console.log("user client", response);
      setUserData({ name: response.data?.name, email: response.data?.email });
    };
    fetchCurrentUser();
  }, []);

  const signOutUser = async () => {
    await logOut();
    toast.success("you signed out successfully");
    window.location.pathname = "/";
  };

  return (
    <SidebarMenu hidden={!userData.email}>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src="" alt={userData.name} />
                <AvatarFallback className="rounded-lg uppercase">
                  {userData.name?.slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{userData.name}</span>
                <span className="truncate text-xs">{userData.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={""} alt={userData.name} />
                  <AvatarFallback className="rounded-lg">
                    {userData.name?.slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{userData.name}</span>
                  <span className="truncate text-xs">{userData.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                {locale === "ar" ? (
                  <NextIntlLink
                    href={pathname}
                    locale={"en"}
                    className={`font-medium font-english`}
                  >
                    <Languages />
                    {t("english")}
                  </NextIntlLink>
                ) : (
                  <NextIntlLink
                    href={pathname}
                    locale={"ar"}
                    className={`font-medium font-arabic`}
                  >
                    <Languages />
                    {t("arabic")}
                  </NextIntlLink>
                )}
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={signOutUser} className="cursor-pointer">
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
