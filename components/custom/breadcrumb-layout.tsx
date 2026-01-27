"use client";
import { Link as NextIntlLink } from "@/i18n/navigation";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";
import { cn, textTrimmer } from "@/lib/utils";
import { Fragment } from "react";
import { useLocale, useTranslations } from "next-intl";

export function BreadcrumbLayout() {
  const t = useTranslations("RoutesConfig");
  const locale = useLocale();
  const pathname = usePathname();
  const pathnameArray = pathname.split("/");

  const prevPathname = pathnameArray.slice(0, -1);
  const currentPathname = pathnameArray.slice(-1)[0];
  const translatedCurrentPathname =
    t(currentPathname) !== `RoutesConfig.${currentPathname}`
      ? t(currentPathname)
      : currentPathname;
  const isInDashboard = pathnameArray.includes("dashboard");

  // remove empty and locale elements from pathname array
  const returnCleanPathname = prevPathname.filter((path) => {
    return path !== locale && path !== "";
  });

  const separator = (
    <BreadcrumbSeparator className={cn(locale === "ar" && "-scale-[1]")} />
  );

  console.log(t("lkjlksjdf"));

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem hidden={isInDashboard}>
          <BreadcrumbLink asChild>
            <NextIntlLink href="/">{t("home")}</NextIntlLink>
          </BreadcrumbLink>
          {separator}
        </BreadcrumbItem>
        {returnCleanPathname.map((path) => (
          <Fragment key={path}>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <NextIntlLink href={`/${path}`}>{t(path)}</NextIntlLink>
              </BreadcrumbLink>
              {separator}
            </BreadcrumbItem>
          </Fragment>
        ))}
        <BreadcrumbItem title={translatedCurrentPathname}>
          <BreadcrumbPage>
            {textTrimmer(translatedCurrentPathname, 20)}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
