"use client";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { MenuIcon } from "lucide-react";
import { PAGES_ROUTES } from "@/constants/config";
import { Link as NextIntlLink } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

type Props = {};

export default function Nav({}: Props) {
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations("navigation");

  const navLinks = [
    { href: PAGES_ROUTES.PROPERTIES.PREVIEW, label: t("properties") },
    { href: PAGES_ROUTES.ABOUT.PREVIEW, label: t("about") },
    { href: PAGES_ROUTES.CONTACT.PREVIEW, label: t("contact") },
    { href: PAGES_ROUTES.BLOG_POSTS.PREVIEW, label: t("blog") },
  ];

  const isActive = (href: string) => pathname.startsWith(href);

  return (
    <nav className="flex items-center h-fit px-6 py-6 sticky top-0 z-50 bg-red- backdrop-blur-xs">
      <div className="w-50 max-w-full h-auto overflow-hidden me-auto">
        <NextIntlLink href="/" className="flex size-full">
          <Image
            className="size-12"
            src="/logo.svg"
            priority={true}
            alt="logo"
            width={200}
            height={50}
          />
        </NextIntlLink>
      </div>
      <ul className="flex items-center gap-8 max-md:hidden">
        {navLinks.map((link) => (
          <li
            key={link.href}
            className={cn(
              "relative before:absolute before:-bottom-1 before:bg-black before:h-0.5 before:transition-all",
              isActive(link.href) ? "before:w-full" : "before:w-0",
            )}
          >
            <NextIntlLink href={link.href} className="font-medium">
              {link.label}
            </NextIntlLink>
          </li>
        ))}
        <li>
          {locale === "ar" ? (
            <NextIntlLink
              href={pathname}
              locale={"en"}
              className={`font-medium font-english`}
            >
              {t("english")}
            </NextIntlLink>
          ) : (
            <NextIntlLink
              href={pathname}
              locale={"ar"}
              className={`font-medium font-arabic`}
            >
              {t("arabic")}
            </NextIntlLink>
          )}
        </li>
      </ul>
      <DropdownMenu>
        <DropdownMenuTrigger className="max-md:block hidden">
          <MenuIcon className="size-8" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {navLinks.map((link) => (
            <DropdownMenuItem key={link.href}>
              <NextIntlLink href={link.href} className="font-medium">
                {link.label}
              </NextIntlLink>
            </DropdownMenuItem>
          ))}
          <DropdownMenuItem>
            {locale === "ar" ? (
              <NextIntlLink
                href={pathname}
                locale={"en"}
                className={`font-medium font-english`}
              >
                {t("english")}
              </NextIntlLink>
            ) : (
              <NextIntlLink
                href={pathname}
                locale={"ar"}
                className={`font-medium font-arabic`}
              >
                {t("arabic")}
              </NextIntlLink>
            )}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
}
