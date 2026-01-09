import FaqView from "@/features/client/faq-view";
import ServicesView from "@/features/client/services-view";
import BlogPostsHomePageView from "@/features/blog-posts/views/blog-posts-home-page-view";
import HeroView from "@/features/client/hero-view";
import PropertiesHomePageView from "@/features/properties/views/properties-home-page-view";
import { Metadata } from "next";
import {
  WEBSITE_URL,
  WEBSITE_URL_AR,
  WEBSITE_URL_EN,
} from "@/constants/config";
import { getTranslations, setRequestLocale } from "next-intl/server";

export const dynamic = "force-static";
export const revalidate = 604800;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const localeParam = locale === "en" ? "/en" : "";
  const canonical = `${WEBSITE_URL}${localeParam}`;
  const enCanonical = `${WEBSITE_URL_EN}`;
  const arCanonical = `${WEBSITE_URL_AR}`;
  const t = await getTranslations("Metadata.home");
  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical,
      languages: {
        "x-default": WEBSITE_URL,
        en: enCanonical,
        ar: arCanonical,
      },
    },
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
      url: canonical,
      images: [{ url: WEBSITE_URL + "/hero-bg.webp" }],
    },
  };
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = (await params).locale;
  setRequestLocale(locale);

  return (
    <div className="min-h-screen">
      <HeroView />
      <div className="responsive grid gap-16 md:gap-40 mt-40">
        <PropertiesHomePageView />
        <BlogPostsHomePageView />
        <FaqView />
        <ServicesView />
      </div>
    </div>
  );
}
