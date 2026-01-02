import PaginationLayout from "@/components/custom/pagination-layout";
import Title from "@/components/custom/title";
import { SITE_INFO } from "@/constants/config";
import { PAGINATION_CONFIG, STATUS_TEXT } from "@/constants/enums";
import BlogPostCardSkeleton from "@/features/blog-posts/skeletons/blog-post-card-skeleton";
import BlogPostsGridView from "@/features/blog-posts/views/blog-posts-grid-view";
import { getBlogPosts } from "@/lib/requests";
import type { SearchParamsType } from "@/types/types";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getTranslations } from "next-intl/server";

export const generateMetadata = async ({
  searchParams,
}: {
  searchParams: SearchParamsType;
}): Promise<Metadata> => {
  const page = (await searchParams)?.page;
  const currentPage = page ? parseInt(page) : 1;
  const blogPosts = await getBlogPosts(
    PAGINATION_CONFIG.BLOG.CLIENT.PAGE,
    currentPage
  );

  if (!blogPosts.data) {
    return {};
  }

  const { nextPage, prevPage } = blogPosts.data;
  const { TITLE, DESCRIPTION, ROUTE } = SITE_INFO.PAGES.BLOG;

  return {
    title: TITLE,
    description: DESCRIPTION,
    alternates: {
      canonical: ROUTE,
    },
    pagination: {
      next: ROUTE + `?page=${nextPage}`,
      previous: ROUTE + `?page=${prevPage}`,
    },
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
