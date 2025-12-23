import UpdateBlogPostView from "@/features/blog-posts/views/mutation-views/update-blog-post-view";
import { getBlogPost, getBlogPostImage } from "@/lib/requests";
import { SlugParamsType } from "@/types/types";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import React from "react";

export const metadata: Metadata = {
  title: "Update Blog posts",
  description: "Update Blog posts page",
};

type Props = {
  params: SlugParamsType;
};

export default async function page(props: Props) {
  const params = await props.params;
  const { slug } = params;
  const t = await getTranslations("common.messages");
  const tBlogPost = await getTranslations("resources.blogPost");

  const blogPost = await getBlogPost(slug);
  if (!blogPost.data) {
    notFound();
  }
  const blogPostImage = await getBlogPostImage(blogPost.data._id);

  return <div>
    <h1 className="text-2xl font-semibold text-primary">
      {t("editing")}: {blogPost.data.title}
    </h1>
    <UpdateBlogPostView blogPost={blogPost.data}  image={blogPostImage.data} />
  </div>;
}
