import FooterView from "@/features/client/footer-view";
import NavView from "@/features/client/nav-view";
import { getSiteInfoImage } from "@/features/site-info/lib/requests";
import { setRequestLocale } from "next-intl/server";
import React from "react";

/**
 * Render the localized page layout including navigation, content area, and footer.
 *
 * @param children - The page content to render inside the layout
 * @param params - A promise that resolves to an object with `locale`, used to set the request locale for this render
 * @returns The layout element containing the navigation (with theme-aware logos), the provided `children` content, and the footer
 */
export default async function layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  // TEMPORARY: Uncomment this if test did not work
  // setRequestLocale(locale);
  const [logo, logoDark] = await Promise.all([
    getSiteInfoImage("logo", "theme_default"),
    getSiteInfoImage("logo", "theme_dark"),
  ]);
  return (
    <div data-component="pages-layout" className="bg-gray-50">
      <NavView logo={{ default: logo, dark: logoDark }} />
      <div className="px-4 mb-20">{children}</div>
      <FooterView />
    </div>
  );
}
