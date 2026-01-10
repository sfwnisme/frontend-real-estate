import PaginationLayout from "@/components/custom/pagination-layout";
import Title from "@/components/custom/title";
import { PAGES_ROUTES } from "@/constants/config";
import { PAGINATION_CONFIG } from "@/constants/enums";
import BlogPostCardSkeleton from "@/features/blog-posts/skeletons/blog-post-card-skeleton";
import BlogPostsGridView from "@/features/blog-posts/views/blog-posts-grid-view";
import { getBlogPosts } from "@/lib/requests";
import type { SearchParamsType } from "@/types/types";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import {
  WEBSITE_URL,
  WEBSITE_URL_EN,
  WEBSITE_URL_AR,
} from "@/constants/config";

const { PREVIEW } = PAGES_ROUTES.BLOG_POSTS;
const { PAGE } = PAGINATION_CONFIG.BLOG.CLIENT;

export const generateMetadata = async ({
  searchParams,
  params,
}: {
  searchParams: SearchParamsType;
  params: Promise<{ locale: string }>;
}): Promise<Metadata> => {
  const { locale } = await params;
  const localeParam = locale === "en" ? "/en" : "";
  const canonical = `${WEBSITE_URL}${localeParam}${PREVIEW}`;
  const enCanonical = `${WEBSITE_URL_EN}${PREVIEW}`;
  const arCanonical = `${WEBSITE_URL_AR}${PREVIEW}`;

  const page = (await searchParams)?.page;
  const currentPage = page ? parseInt(page) : 1;
  const blogPosts = await getBlogPosts(PAGE, currentPage);
  if (!blogPosts.data) {
    return {};
  }
  const { nextPage, prevPage } = blogPosts.data;

  const t = await getTranslations("Metadata.blogPosts");
  const title = t("title");
  const description = t("description");
  const ogTitle = t("ogTitle");
  const ogDescription = t("ogDescription");
  const keywords = [title, ogTitle];
  const next = canonical + `?page=${nextPage}`;
  const previous = canonical + `?page=${prevPage}`;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        "x-default": canonical,
        en: enCanonical,
        ar: arCanonical,
      },
    },
    pagination: {
      next,
      previous,
    },
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      images: [{ url: WEBSITE_URL + "/hero-bg.webp" }],
    },
    keywords,
  };
};

export default async function page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const t = await getTranslations("BlogPostsPage");
  const page = (await searchParams)?.page;
  const currentPage = page ? parseInt(page) : 1;
  const currentPageSize = PAGINATION_CONFIG.BLOG.CLIENT.PAGE;
  const blogPosts = await getBlogPosts(
    PAGINATION_CONFIG.BLOG.CLIENT.PAGE,
    currentPage
  );
  if (!blogPosts.data) {
    notFound();
  }
  const blogPostsData = blogPosts.data;

  return (
    <div>
      <Title
        type="start"
        title={t("hero.title")}
        description={t("hero.description")}
      />
      <div className="h-10" />
      <Suspense fallback={<BlogPostCardSkeleton count={currentPageSize} />}>
        <BlogPostsGridView
          currentPage={currentPage}
          pageSize={currentPageSize}
        />
      </Suspense>
      <div className="my-12">
        <PaginationLayout
          page={blogPostsData.page}
          nextPage={blogPostsData.nextPage}
          prevPage={blogPostsData.prevPage}
          currentPage={currentPage}
          totalPages={blogPostsData.totalPages}
        />
      </div>
    </div>
  );
}
