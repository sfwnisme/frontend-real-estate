import FaqView from "@/features/client/faq-view";
import ServicesView from "@/features/client/services-view";
import BlogPostsHomePageView from "@/features/blog-posts/views/blog-posts-home-page-view";
import HeroView from "@/features/client/hero-view";
import PropertiesHomePageView from "@/features/properties/views/properties-home-page-view";
import { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { returnAlternateLanguages, returnCanonical } from "@/lib/utils";
import { getSiteInfo } from "@/lib/requests";
import { notFound } from "next/navigation";
import { getSiteInfoImage } from "@/features/site-info/lib/requests";

export const dynamic = "force-static";
export const revalidate = 604800;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const siteInfo = await getSiteInfo();
  if (!siteInfo.data) {
    return {};
  }
  const localeName = locale === "ar" ? "ar" : "en";
  const siteInfoData = siteInfo.data;
  const localizedSiteInfo = siteInfoData[localeName];
  const seoData = localizedSiteInfo?.seo;
  const getOgImage = await getSiteInfoImage("og-image", null);
  const ogImageUrl = getOgImage?.url;
  const title = seoData?.title;
  const description = seoData?.description;
  return {
    title,
    description,
    alternates: {
      canonical: returnCanonical(locale, "/"),
      languages: returnAlternateLanguages("/"),
    },
    openGraph: {
      title,
      description,
      images: [{ url: ogImageUrl }],
      url: returnCanonical(locale, "/"),
      type: "website",
    },
    twitter: {
      title,
      description,
      images: [{ url: ogImageUrl }],
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
  const siteInfo = await getSiteInfo();
  if (!siteInfo.data) {
    notFound();
  }
  const localeName = locale === "ar" ? "ar" : "en";
  const siteInfoData = siteInfo.data;
  const localizedSiteInfo = siteInfoData[localeName];
  const contactData = siteInfoData.contact;

  console.log(siteInfoData);

  return (
    <div className="min-h-screen">
      <HeroView
        title={localizedSiteInfo.info.name}
        description={localizedSiteInfo.info.description}
        image={localizedSiteInfo.seo.ogImage}
      />
      <div className="responsive grid gap-16 md:gap-40 mt-40">
        <PropertiesHomePageView />
        <BlogPostsHomePageView />
        <FaqView />
        <ServicesView />
      </div>
    </div>
  );
}
