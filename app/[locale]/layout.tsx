import type { Metadata } from "next";
import { Inter, Noto_Kufi_Arabic } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { SITE_INFO } from "@/constants/config";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";

const { NAME, DESCRIPTION } = SITE_INFO;
type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

const interFont = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"]
});

const kufiFont = Noto_Kufi_Arabic({
  variable: "--font-noto-kufi-arabic",
  subsets: ["arabic"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"]
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_FRONTEND_URL!),
  title: {
    template: `%s | ${NAME}`,
    default: NAME,
  },
  description: DESCRIPTION,
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SEARCH_CONSOLE_KEY,
  },
};

export default async function RootLayout({ children, params }: Props) {
  const locale = (await params).locale;
  // MANDATORY: Ensure that the incoming `locale` is valid
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  const defaultLocale = locale ?? routing.defaultLocale;
  const isRtl = defaultLocale === "ar";
  const font = isRtl ? kufiFont.className : interFont.className;
  const fontVariables = `${interFont.variable} ${kufiFont.variable}`

  return (
    <html
      lang={defaultLocale}
      dir={isRtl ? "rtl" : "ltr"}
    >
      <body className={`${font} ${fontVariables} antialiased overflow-x-hidden`}>
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
        <Toaster position="top-right" expand />
      </body>
    </html>
  );
}
