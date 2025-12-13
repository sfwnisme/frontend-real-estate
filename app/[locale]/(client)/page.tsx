import FaqView from "@/features/client/faq-view";
import ServicesView from "@/features/client/services-view";
import BlogPostsHomePageView from "@/features/blog-posts/views/blog-posts-home-page-view";
import HeroView from "@/features/client/hero-view";
import PropertiesHomePageView from "@/features/properties/views/properties-home-page-view";
import { Metadata } from "next";
import { SITE_INFO } from "@/constants/config";
import { routing } from "@/i18n/routing";
import { setRequestLocale } from "next-intl/server";

const { TITLE, DESCRIPTION, ROUTE } = SITE_INFO.PAGES.HOME;
export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: ROUTE,
    languages: {
      en: `${ROUTE}/en`,
      ar: `${ROUTE}/ar`,
    },
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: ROUTE,
    images: [{ url: "/logo.png" }],
  },
};

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function Home({params}: {params: Promise<{locale: string}>}) {
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
