import type { MetadataRoute } from "next";
import { getBlogPosts } from "@/lib/requests";

const BASE_URL = process.env.NEXT_PUBLIC_FRONTEND_URL;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogPosts = await getBlogPosts(300); // Fetch all blog posts

  if (!blogPosts.data?.data) {
    return [];
  }

  return blogPosts.data.data.map((post) => ({
    url: `${BASE_URL}/blog-posts/${post.slug}`,
    lastModified: post.updatedAt || post.createdAt,
    changeFrequency: "weekly",
    published: post.publishedAt,
    priority: 0.6,
  }));
}
