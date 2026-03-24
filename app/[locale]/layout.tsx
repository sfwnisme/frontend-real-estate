import type { Metadata } from "next";
import { Inter, Noto_Kufi_Arabic } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { returnAlternateLanguages, returnCanonical } from "@/lib/utils";
import { getSiteInfoImage } from "@/features/site-info/lib/requests";
import { STATUS_TEXT } from "@/constants/enums";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

const interFont = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const kufiFont = Noto_Kufi_Arabic({
  variable: "--font-noto-kufi-arabic",
  subsets: ["arabic"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

/**
 * Builds page metadata for the requested locale using site translations and configuration.
 *
 * Produces a Metadata object that includes a locale-aware title template and default title, site description, canonical and alternate language links, Google verification token (if configured), icon URL (if available), and robots directives.
 *
 * @param params - A promise resolving to an object with the `locale` string for which metadata should be generated
 * @returns A Metadata object containing the title template and default title, description, alternates (canonical and languages), verification.google, icons.icon (favicon URL or `undefined`), and robots settings
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = (await params).locale;
  const t = await getTranslations("SiteConfig");
  const metadataBase = new URL(process.env.NEXT_PUBLIC_FRONTEND_URL as string);
  const getFavicon = await getSiteInfoImage("icon", "theme_default");
  const faviconUrl = getFavicon?.url;

  const SITE_NAME = t("name");
  const PAGE_TEMPLATE_AR = `${SITE_NAME} | %s`;
  const PAGE_TEMPLATE_EN = `%s | ${SITE_NAME}`;
  const PAGE_TEMPLATE = locale === "ar" ? PAGE_TEMPLATE_AR : PAGE_TEMPLATE_EN;
  return {
    metadataBase,
    title: {
      template: PAGE_TEMPLATE,
      default: SITE_NAME,
    },
    description: t("description"),
    alternates: {
      canonical: returnCanonical(locale, "/"),
      languages: returnAlternateLanguages("/"),
    },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SEARCH_CONSOLE_KEY,
    },
    icons: {
      icon: faviconUrl,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

/**
 * Produce route params for each supported locale for static generation.
 *
 * @returns An array of route param objects, each with `locale` set to a supported locale
 */
export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

/**
 * Render the application root layout configured for a specific locale.
 *
 * Validates the provided `locale`, applies it to the request scope, loads locale-specific
 * translations, sets document direction and fonts, and returns the root HTML structure
 * that supplies `NextIntlClientProvider` to its children and renders the global `Toaster`.
 *
 * @param children - The page content to render inside the layout
 * @param params - A promise resolving to an object with a `locale` string (e.g., `{ locale: "en" }`)
 * @returns The root `<html>` element containing the locale-aware `<body>` with the provider and toaster
 */
export default async function RootLayout({ children, params }: Props) {
  const locale = (await params).locale;
  // MANDATORY: Ensure that the incoming `locale` is valid
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  // Import messages directly based on locale to avoid race conditions during parallel SSG
  const messages = (await import(`@/messages/${locale}.json`)).default;

  const isRtl = locale === "ar";
  const font = isRtl ? kufiFont.className : interFont.className;
  const fontVariables = `${interFont.variable} ${kufiFont.variable}`;

  return (
    <html lang={locale} dir={isRtl ? "rtl" : "ltr"}>
      <body
        className={`${font} ${fontVariables} antialiased overflow-x-hidden`}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
        <Toaster position="top-right" expand />
      </body>
    </html>
  );
}
