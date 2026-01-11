"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { MenuIcon } from "lucide-react";
import { PAGES_ROUTES } from "@/constants/config";
import { Link as NextIntlLink, getPathname } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "@/i18n/navigation";

type Props = {};

export default function Nav({}: Props) {
  const pathname = usePathname()
  const locale = useLocale();
  const t = useTranslations("navigation");
  console.log("locale test", t("properties"));
  return (
    <nav className="flex items-center h-fit px-6 py-6 sticky top-0 z-50 bg-red- backdrop-blur-xs">
      <div className="w-50 max-w-full h-auto overflow-hidden me-auto">
        <NextIntlLink href="/" className="flex size-full">
          <Image
            className="size-full"
            src="/logoipsum.png"
            priority={true}
            alt="logo"
            width={200}
            height={50}
          />
        </NextIntlLink>
      </div>
      <ul className="flex items-center gap-8 max-md:hidden">
        <li>
          <NextIntlLink href={PAGES_ROUTES.PROPERTIES.PREVIEW} className="font-medium">
            {t("properties")}
          </NextIntlLink>
        </li>
        <li>
          <NextIntlLink href={PAGES_ROUTES.ABOUT.PREVIEW} className="font-medium">
            {t("about")}
          </NextIntlLink>
        </li>
        <li>
          <NextIntlLink href={PAGES_ROUTES.CONTACT.PREVIEW} className="font-medium">
            {t("contact")}
          </NextIntlLink>
        </li>
        <li>
          <NextIntlLink href={PAGES_ROUTES.BLOG_POSTS.PREVIEW} className="font-medium">
            {t("blog")}
          </NextIntlLink>
        </li>
        <li>
          {
            locale === "ar" ? (
              <NextIntlLink 
                href={pathname}
                locale={'en'} 
                className={`font-medium font-english`}
              >
                {t("english")}
              </NextIntlLink>
            ) : (
              <NextIntlLink 
                href={pathname}
                locale={'ar'} 
                className={`font-medium font-arabic`}
              >
                {t("arabic")}
              </NextIntlLink>
            )
          }
        </li>
      </ul>
      <DropdownMenu>
        <DropdownMenuTrigger className="max-md:block hidden">
          <MenuIcon className="size-8" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <NextIntlLink
              href={PAGES_ROUTES.PROPERTIES.PREVIEW}
              className="font-medium"
            >
              {t("properties")}
            </NextIntlLink>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <NextIntlLink href={PAGES_ROUTES.ABOUT.PREVIEW} className="font-medium">
              {t("about")}
            </NextIntlLink>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <NextIntlLink href={PAGES_ROUTES.CONTACT.PREVIEW} className="font-medium">
              {t("contact")}
            </NextIntlLink>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <NextIntlLink
              href={PAGES_ROUTES.BLOG_POSTS.PREVIEW}
              className="font-medium"
            >
              {t("blog")}
            </NextIntlLink>
          </DropdownMenuItem>
          <DropdownMenuItem>
          {
            locale === "ar" ? (
              <NextIntlLink 
                href={pathname}
                locale={'en'} 
                className={`font-medium font-english`}
              >
                {t("english")}
              </NextIntlLink>
            ) : (
              <NextIntlLink 
                href={pathname}
                locale={'ar'} 
                className={`font-medium font-arabic`}
              >
                {t("arabic")}
              </NextIntlLink>
            )
          }
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
}
