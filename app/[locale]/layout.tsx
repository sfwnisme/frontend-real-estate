import type { Metadata } from "next";
import { Inter, Noto_Kufi_Arabic } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { returnAlternateLanguages, returnCanonical } from "@/lib/utils";

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

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const locale = (await params).locale;
  const t = await getTranslations("Metadata.home");
  const metadataBase = new URL(process.env.NEXT_PUBLIC_FRONTEND_URL as string);
  return {
    metadataBase,
    title: {
      template: `%s | ${t("title")}`,
      default: t("title"),
    },
    description: t("description"),
    alternates: {
      canonical: returnCanonical(locale, "/"),
      languages: returnAlternateLanguages("/"),
    },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SEARCH_CONSOLE_KEY,
    },
    robots: {
      index: true,
      follow: true,
    }
  }
}

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({ children, params }: Props) {
  const locale = (await params).locale;
  // MANDATORY: Ensure that the incoming `locale` is valid
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  
  // Enable static rendering for SSG
  setRequestLocale(locale);
  
  // Import messages directly based on locale to avoid race conditions during parallel SSG
  const messages = (await import(`@/messages/${locale}.json`)).default;
  
  const isRtl = locale === "ar";
  const font = isRtl ? kufiFont.className : interFont.className;
  const fontVariables = `${interFont.variable} ${kufiFont.variable}`

  return (
    <html
      lang={locale}
      dir={isRtl ? "rtl" : "ltr"}
    >
      <body className={`${font} ${fontVariables} antialiased overflow-x-hidden`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
        <Toaster position="top-right" expand />
      </body>
    </html>
  );
}
