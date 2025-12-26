import Title from "@/components/custom/title";
import { Badge } from "@/components/ui/badge";
import { STATUS_TEXT } from "@/constants/enums";
import { getBlogPost, getBlogPostImage, getBlogPosts } from "@/lib/requests";
import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";
import { BlogPost, OgImageType } from "@/types/types";
import { Metadata } from "next";
import { PAGES_ROUTES, SITE_INFO } from "@/constants/config";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const blogPosts = await getBlogPosts();
  if (!blogPosts.data?.data) {
    return [];
  }

  const blogPost = blogPosts.data.data.map((blogPost) => ({
    slug: blogPost.slug,
  }));
  if (blogPost.length === 0) return [];
  return blogPost;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  try {
    const blogPost = await getBlogPost(slug);
    if (!blogPost.data) {
      return {
        title: "Blog Post Not Found",
        description: "The requested blog post could not be found.",
      };
    }
    const blogPostData = blogPost.data;

    // Handle image - continue even if image fails (next-intl compatibility)
    let blogPostImageMetadata: OgImageType | undefined = undefined;
    try {
      const blogPostImage = await getBlogPostImage(blogPostData._id);
      const blogPostImageData = blogPostImage.data;

      // Check for success and valid data with dimensions
      if (blogPostImage.status === 200 && blogPostImageData && blogPostImageData.dimensions) {
        blogPostImageMetadata = {
          url: blogPostImageData.url || "",
          width: blogPostImageData.dimensions?.width || 0,
          height: blogPostImageData.dimensions?.height || 0,
          alt: blogPostData.title || "",
          type: blogPostImageData.mimeType || "",
        };
      }
    } catch (error) {
      console.error("Error fetching blog post image for metadata:", error);
      // Continue without image - don't fail the entire metadata generation
    }

    const canonicalUrl = PAGES_ROUTES.BLOG_POSTS.PREVIEW + slug;

    return {
      title: blogPostData.title,
      description: blogPostData.meta?.description || blogPostData.excerpt,
      alternates: {
        canonical: canonicalUrl,
      },
      keywords: blogPostData.meta?.keywords,
      openGraph: {
        type: "article",
        images: blogPostImageMetadata ? [blogPostImageMetadata] : undefined,
        title: blogPostData.title,
        description: blogPostData.meta?.description || blogPostData.excerpt,
        siteName: SITE_INFO.NAME,
        url: canonicalUrl,
        countryName: SITE_INFO.COUNTRY,
        publishedTime: String(blogPostData.createdAt),
        modifiedTime: String(blogPostData.updatedAt),
        tags: blogPostData.meta?.keywords,
        authors: SITE_INFO.NAME,
      },
      twitter: {
        images: blogPostImageMetadata ? [blogPostImageMetadata] : undefined,
        title: blogPostData.title,
        description: blogPostData.meta?.description || blogPostData.excerpt,
        card: "summary_large_image",
      },
    };
  } catch (error) {
    console.error("Error generating metadata for blog post:", error);
    // Return fallback metadata instead of empty object (next-intl compatible)
    return {
      title: "Blog Post",
      description: "Blog post details",
    };
  }
}

export default async function page({ params }: Props) {
  const { slug } = await params;
  const blogPost = await getBlogPost(slug);
  const blogPostData = blogPost.data;
  if (!blogPostData) {
    notFound();
  }
  
  const blogPostImage = await getBlogPostImage(blogPostData._id);
  const blogPostImageData = blogPostImage.data;

  const renderKeywords = blogPostData.meta.keywords.map((keyword) => (
    <Badge variant="outline" key={keyword}>
      {keyword}
    </Badge>
  ));

  return (
    <div>
      <div className="mb-8">
        <div className="mb-8">
          <Title title={blogPostData.title} type="start" />
          <p className="text-gray-500 mt-4">{blogPostData.excerpt}</p>
        </div>
        {blogPostImage.statusText === STATUS_TEXT.SUCCESS && (
          <div className="w-full h-auto">
            <Image
              src={blogPostImageData?.url || ""}
              height={blogPostImageData?.dimensions.height || 500}
              width={blogPostImageData?.dimensions.width || 500}
              alt={blogPostData.title}
              className="rounded-2xl size-full max-h-[500px] object-cover aspect-video"
            />
          </div>
        )}
      </div>
      <article className="mt-8" dangerouslySetInnerHTML={{ __html: blogPostData.content }} />
      <div className="mt-8 flex flex-wrap gap-2">{renderKeywords}</div>
    </div>
  );
}
