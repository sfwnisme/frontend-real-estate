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
import { Typography } from "@/components/custom/typography";

export const revalidate = 3600;

const { PREVIEW } = PAGES_ROUTES.BLOG_POSTS;

type Props = {
  params: Promise<{ slug: string; locale: string }>;
};

/**
 * Provides the list of blog post slugs used to generate static routes.
 *
 * @returns An array of objects each containing a `slug` string; an empty array if no posts are available.
 */
export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const blogPosts = await getBlogPosts(10);
  if (!blogPosts.data?.data) {
    return [];
  }

  const blogPost = blogPosts.data.data.map((blogPost) => ({
    slug: blogPost.slug,
  }));
  if (blogPost.length === 0) return [];
  return blogPost;
}

/**
 * Generate page metadata including Open Graph and Twitter cards for a blog post identified by slug.
 *
 * @param params - A promise resolving to an object with `slug` and `locale` used to fetch the blog post and locale-specific site translations
 * @returns The assembled `Metadata` for the blog post (title, description, keywords, alternates, `openGraph`, and `twitter`). Returns an empty object if the blog post cannot be found.
 */
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

  const t = await getTranslations({ locale, namespace: "SiteConfig" });
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
          <Typography size="3xl" as="h1">
            {blogPostData.title}
          </Typography>
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
