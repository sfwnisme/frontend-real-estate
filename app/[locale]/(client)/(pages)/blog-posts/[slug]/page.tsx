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
  const blogPost = await getBlogPost(slug);
  if (!blogPost.data) {
    return {};
  }
  const blogPostData = blogPost.data;
  const blogPostImage = await getBlogPostImage(blogPostData._id);
  const blogPostImageData = blogPostImage.data

  const blogPostImageMetadata: OgImageType = {
    url: blogPostImageData?.url || "",
    width: blogPostImageData?.dimensions.width || 0,
    height: blogPostImageData?.dimensions.height || 0,
    alt: blogPostData.title || "",
    type: blogPostImageData?.mimeType || "",
  };
  const canonicalUrl = PAGES_ROUTES.BLOG_POSTS.PREVIEW + slug;

  console.log(blogPostImageData)

  return {
    title: blogPostData.title,
    description: blogPostData.meta.description || blogPostData.excerpt,
    alternates: {
      canonical: canonicalUrl,
    },
    keywords: blogPostData.meta.keywords,
    openGraph: {
      type: "article",
      images: blogPostImageMetadata,
      title: blogPostData.title,
      description: blogPostData.meta.description || blogPostData.excerpt,
      siteName: SITE_INFO.NAME,
      url: canonicalUrl,
      countryName: SITE_INFO.COUNTRY,
      publishedTime: String(blogPostData.createdAt),
      modifiedTime: String(blogPostData.updatedAt),
      tags: blogPostData.meta.keywords,
      authors: SITE_INFO.NAME,
    },
    twitter: {
      images: blogPostImageMetadata,
      title: blogPostData.title,
      description: blogPostData.meta.description || blogPostData.excerpt,
      card: "summary_large_image",
    },
  };
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
