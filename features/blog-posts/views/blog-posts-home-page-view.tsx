import React, { Suspense } from "react";
import { getBlogPosts } from "@/lib/requests";
import BlogCard from "@/components/custom/blog-card";
import { PAGINATION_CONFIG } from "@/constants/enums";
import BlogPostCardSkeleton from "../skeletons/blog-post-card-skeleton";
import Title from "@/components/custom/title";
import BlogPostsGridView from "./blog-posts-grid-view";
import { getTranslations } from "next-intl/server";

type Props = {
  pageSize?: number;
  currentPage?: number;
};

export default async function BlogPostsHomePageView({
  pageSize = PAGINATION_CONFIG.BLOG.CLIENT.OVERVIEW,
  currentPage = 1,
}: Props) {
  const t = await getTranslations("HomePage.BlogSection")
  return (
    <div>
      <Title
        type="with_button"
        title={t('title')}
        description={t('description')}
        url="/blog-posts"
      />
      <div className="h-16" />
        <Suspense fallback={<BlogPostCardSkeleton count={3} />}>
          <BlogPostsGridView pageSize={pageSize} currentPage={currentPage} />
        </Suspense>
    </div>
  );
}
