import FooterView from "@/features/client/footer-view";
import NavView from "@/features/client/nav-view";
import { getSiteInfoImage } from "@/features/site-info/lib/requests";
import React from "react";

export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [logo, logoDark] = await Promise.all([
    getSiteInfoImage("logo", "theme_default"),
    getSiteInfoImage("logo", "theme_dark"),
  ]);
  console.log(logo);
  return (
    <div data-component="pages-layout" className="bg-gray-50">
      <NavView logo={{ default: logo, dark: logoDark }} />
      <div className="px-4 mb-20">{children}</div>
      <FooterView />
    </div>
  );
}
