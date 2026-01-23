import Title from "@/components/custom/title";
import { Badge } from "@/components/ui/badge";
import { STATUS_TEXT } from "@/constants/enums";
import { getBlogPost, getBlogPostImage, getBlogPosts } from "@/lib/requests";
import Image from "next/image";
import { notFound } from "next/navigation";
import { OgImageType } from "@/types/types";
import { Metadata } from "next";
import { PAGES_ROUTES } from "@/constants/config";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { returnAlternateLanguages, returnCanonical } from "@/lib/utils";

export const dynamic = "force-static";
export const revalidate = 3600;

const { PREVIEW } = PAGES_ROUTES.BLOG_POSTS;

type Props = {
  params: Promise<{ slug: string; locale: string }>;
};

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const blogPosts = await getBlogPosts(1000);
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
  const { slug, locale } = await params;
  const blogPost = await getBlogPost(slug);
  if (!blogPost.data) {
    return {};
  }
  const blogPostData = blogPost.data;
  const blogPostImage = await getBlogPostImage(blogPostData._id);
  const blogPostImageData = blogPostImage.data;

  const blogPostImageMetadata: OgImageType = {
    url: blogPostImageData?.url || "",
    width: blogPostImageData?.dimensions.width || 0,
    height: blogPostImageData?.dimensions.height || 0,
    alt: blogPostData.title || "",
    type: blogPostImageData?.mimeType || "",
  };
  const pagePath = PREVIEW + "/" + slug;
  const canonical = returnCanonical(locale, pagePath);

  const t = await getTranslations("SiteConfig");
  const SITE_NAME = t("name");
  const SITE_COUNTRY = t("country");

  return {
    title: blogPostData.title,
    description: blogPostData.meta.description || blogPostData.excerpt,
    alternates: {
      canonical,
      languages: returnAlternateLanguages(pagePath),
    },
    keywords: blogPostData.meta.keywords,
    openGraph: {
      type: "article",
      images: blogPostImageMetadata,
      title: blogPostData.title,
      description: blogPostData.meta.description || blogPostData.excerpt,
      siteName: SITE_NAME,
      url: canonical,
      countryName: SITE_COUNTRY,
      publishedTime: String(blogPostData.createdAt),
      modifiedTime: String(blogPostData.updatedAt),
      tags: blogPostData.meta.keywords,
      authors: SITE_NAME,
    },
    twitter: {
      images: blogPostImageMetadata,
      title: blogPostData.title,
      description: blogPostData.meta.description || blogPostData.excerpt,
      card: "summary_large_image",
    },
  };
}

export default async function page({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  setRequestLocale(locale);

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
        {blogPostImage.statusText === STATUS_TEXT.SUCCESS &&
          blogPostImageData?.url && (
            <div className="w-full h-auto">
              <Image
                src={blogPostImageData.url}
                height={blogPostImageData.dimensions?.height || 500}
                width={blogPostImageData.dimensions?.width || 500}
                alt={blogPostData.title}
                className="rounded-2xl size-full max-h-[500px] object-cover aspect-video"
              />
            </div>
          )}
      </div>
      <article
        className="mt-8"
        dangerouslySetInnerHTML={{ __html: blogPostData.content }}
      />
      <div className="mt-8 flex flex-wrap gap-2">{renderKeywords}</div>
    </div>
  );
}
