import { Suspense } from "react";
import { getBlogPosts } from "@/lib/requests";
import BlogCard from "@/components/custom/blog-card";
import { PAGINATION_CONFIG } from "@/constants/enums";
import BlogPostCardSkeleton from "../skeletons/blog-post-card-skeleton";

type Props = {
  pageSize?: number;
  currentPage?: number;
};

const RenderBlogPosts = async ({ pageSize, currentPage }: Props) => {
  const blogPosts = await getBlogPosts(pageSize, currentPage);
  if (!blogPosts.data?.data) return null;
  const blogPostsData = blogPosts.data.data;
  const renderBlogPosts = blogPostsData.map((blogPost) => (
    <BlogCard blogPost={blogPost} key={blogPost._id} />
  ));
  return renderBlogPosts;
};

export default async function BlogPostsGridView({
  pageSize,
  currentPage,
}: Props) {
  const currentPageSize = pageSize || PAGINATION_CONFIG.BLOG.CLIENT.PAGE;
  return (
    <div className="responsive">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        <Suspense fallback={<BlogPostCardSkeleton count={currentPageSize} />}>
          <RenderBlogPosts
            pageSize={currentPageSize}
            currentPage={currentPage}
          />
        </Suspense>
      </div>
    </div>
  );
}
