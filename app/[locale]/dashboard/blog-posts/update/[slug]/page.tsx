import UpdateBlogPostView from "@/features/blog-posts/views/mutation-views/update-blog-post-view";
import { getBlogPost, getBlogPostImage } from "@/lib/requests";
import { SlugParamsType } from "@/types/types";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Typography } from "@/components/custom/typography";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("resources.blogPost");
  return {
    title: t("update"),
  };
}

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

  return (
    <div>
      <Typography as="h1" variant="h5" className="mb-4">
        {t("editing")}: {blogPost.data.title}
      </Typography>
      <UpdateBlogPostView blogPost={blogPost.data} image={blogPostImage.data} />
    </div>
  );
}
