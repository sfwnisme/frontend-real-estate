import FaqView from "@/features/client/faq-view";
import ServicesView from "@/features/client/services-view";
import BlogPostsHomePageView from "@/features/blog-posts/views/blog-posts-home-page-view";
import HeroView from "@/features/client/hero-view";
import PropertiesHomePageView from "@/features/properties/views/properties-home-page-view";
import { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { returnAlternateLanguages, returnCanonical } from "@/lib/utils";

export const dynamic = "force-static";
export const revalidate = 604800;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations("Metadata.home");
  const title = t("title");
  const description = t("description");
  const ogTitle = t("ogTitle");
  const ogDescription = t("ogDescription");
  return {
    title,
    description,
    alternates: {
      canonical: returnCanonical(locale, "/"),
      languages: returnAlternateLanguages("/"),
    },
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      images: [{ url: "/hero-bg.webp" }],
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
