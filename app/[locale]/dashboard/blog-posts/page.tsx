import PaginationLayout from "@/components/custom/pagination-layout";
import { Button } from "@/components/ui/button";
import { PAGES_ROUTES } from "@/constants/config";
import { PAGINATION_CONFIG } from "@/constants/enums";
import BlogPostsTableSkeleton from "@/features/blog-posts/skeletons/blog-posts-table-skeleton";
import BlogPostsTableView from "@/features/blog-posts/views/blog-posts-table-view";
import can from "@/features/dashboard/auth/can";
import { getBlogPosts } from "@/lib/requests";
import { type SearchParamsType } from "@/types/types";
import { Visible } from "@sfwnisme/visi";
import { type Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

const { CREATE } = PAGES_ROUTES.BLOG_POSTS;

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("resources.blogPost")
  return {
    title: t("plural"),
  }
}
export default async function page({
  searchParams,
}: {
  searchParams: SearchParamsType;
}) {
  const t = await getTranslations("resources.blogPost")
  const searchParamsRes = await searchParams;
  const page = searchParamsRes?.page;
  const currentPage = page ? parseInt(page) : 1;
  const currentPageSize = PAGINATION_CONFIG.BLOG.DASHBOARD;

  const blogPosts = await getBlogPosts(currentPageSize, currentPage);
  const blogPostsData = blogPosts.data;
  if (!blogPostsData?.data) {
    notFound();
  }
  const canCreateBlogPost = await can("blogpost.write");

  return (
    <div className="w-full">
      <div className="inline-flex justify-between w-full mb-12">
        <h1 className="scroll-m-20 text-center text-4xl font-medium tracking-tight text-balance">
          {t("plural")}
        </h1>
        <Visible when={canCreateBlogPost}>
          <Button asChild>
            <Link href={CREATE}>{t("create")}</Link>
          </Button>
        </Visible>
      </div>
      <Suspense
        fallback={<BlogPostsTableSkeleton count={currentPageSize} />}
        key={currentPage}
      >
        <BlogPostsTableView
          currentPage={currentPage}
          searchParams={searchParamsRes}
        />
      </Suspense>
      <PaginationLayout
        page={blogPostsData.page}
        nextPage={blogPostsData.nextPage}
        prevPage={blogPostsData.prevPage}
        currentPage={currentPage}
        totalPages={blogPostsData.totalPages}
      />
    </div>
  );
}
