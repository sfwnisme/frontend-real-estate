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
import { Link as NextIntlLink } from "@/i18n/navigation";
import { useLocale } from "next-intl";

type Props = {};

export default function Nav({}: Props) {
  const locale = useLocale();
  const switchLocale = useLocale() === "en" ? "ar" : "en";
  console.log(locale);
  return (
    <nav className="flex items-center h-fit px-6 py-6 sticky top-0 z-50 bg-red- backdrop-blur-xs">
      <div className="w-50 max-w-full h-auto overflow-hidden me-auto">
        <Link href="/" className="flex size-full">
          <Image
            className="size-full"
            src="/logoipsum.png"
            priority={true}
            alt="logo"
            width={200}
            height={50}
          />
        </Link>
      </div>
      <ul className="flex items-center gap-8 max-md:hidden">
        <li>
          <Link href={PAGES_ROUTES.PROPERTIES.PREVIEW} className="font-medium">
            Properties
          </Link>
        </li>
        <li>
          <Link href={PAGES_ROUTES.ABOUT.PREVIEW} className="font-medium">
            About
          </Link>
        </li>
        <li>
          <Link href={PAGES_ROUTES.CONTACT.PREVIEW} className="font-medium">
            Contact
          </Link>
        </li>
        <li>
          <Link href={PAGES_ROUTES.BLOG_POSTS.PREVIEW} className="font-medium">
            Blog
          </Link>
        </li>
        <li>
          <NextIntlLink 
            href="/" 
            locale={switchLocale} 
            className={`font-medium ${locale === "en" ? "font-arabic" : "font-english"}`}
          >
            {useLocale() === "ar" ? "English" : "العربية"}
          </NextIntlLink>
        </li>
      </ul>
      <DropdownMenu>
        <DropdownMenuTrigger className="max-md:block hidden">
          <MenuIcon className="size-8" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <Link
              href={PAGES_ROUTES.PROPERTIES.PREVIEW}
              className="font-medium"
            >
              Properties
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href={PAGES_ROUTES.ABOUT.PREVIEW} className="font-medium">
              About
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href={PAGES_ROUTES.CONTACT.PREVIEW} className="font-medium">
              Contact
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link
              href={PAGES_ROUTES.BLOG_POSTS.PREVIEW}
              className="font-medium"
            >
              Blog
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <NextIntlLink
              href="/"
              locale={switchLocale}
              className="font-medium"
            >
              {useLocale() === "ar" ? "English" : "العربية"}
            </NextIntlLink>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
}
