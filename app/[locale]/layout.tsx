import type { Metadata } from "next";
import { Inter, Noto_Kufi_Arabic } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { SITE_INFO } from "@/constants/config";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

const interFont = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const kufiFont = Noto_Kufi_Arabic({
  variable: "--font-noto-kufi-arabic",
  subsets: ["arabic"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_FRONTEND_URL!),
  title: {
    template: `%s | ${SITE_INFO.NAME}`,
    default: SITE_INFO.NAME,
  },
  description: SITE_INFO.DESCRIPTION,
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SEARCH_CONSOLE_KEY,
  },
};

export default async function RootLayout({ children, params }: Props) {
  const locale = (await params).locale;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  const defaultLocale = locale ?? routing.defaultLocale;
  const isRtl = defaultLocale === "ar";
  const font = isRtl ? kufiFont.className : interFont.className;

  return (
    <html
      lang={defaultLocale}
      dir={isRtl ? "rtl" : "ltr"}
    >
      <body className={`${font} antialiased overflow-x-hidden`}>
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
        <Toaster position="top-right" expand />
      </body>
    </html>
  );
}
