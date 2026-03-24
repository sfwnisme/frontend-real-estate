import { BreadcrumbLayout } from "@/components/custom/breadcrumb-layout";
import { DashboardSidebar } from "./dashboard-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { ModeToggle } from "@/components/mode-toggle";
import { getSiteInfoImage } from "../site-info/lib/requests";

/**
 * Wraps page content in the dashboard layout: a sidebar (supplied with default and dark theme logos), a sticky header with breadcrumb and mode toggle, and a main content area that renders `children`.
 *
 * Fetches the site's default and dark theme logo images and passes them to the sidebar before rendering.
 *
 * @param children - The page content to render inside the dashboard main area
 * @returns A React element representing the complete dashboard layout
 */
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [logo_default, logo_dark] = await Promise.all([
    getSiteInfoImage("logo", "theme_default"),
    getSiteInfoImage("logo", "theme_dark"),
  ]);
  return (
    <SidebarProvider>
      <DashboardSidebar logo={{ default: logo_default, dark: logo_dark }} />
      <SidebarInset className="min-w-0">
        <header className="sticky top-0 z-10 bg-background border-b mb-4 flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <BreadcrumbLayout />
          </div>
          <div className="flex items-center gap-2 ms-auto me-4">
            <ModeToggle />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          {/* <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <div className="bg-muted/50 aspect-video rounded-xl" />
          <div className="bg-muted/50 aspect-video rounded-xl" />
          <div className="bg-muted/50 aspect-video rounded-xl" />
          </div>
          <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" /> */}
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
