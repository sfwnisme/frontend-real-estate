import { getBlogPosts } from "@/lib/requests";
import { NextRequest, NextResponse } from "next/server";

// Enable Next.js route handler caching, revalidating every 3600 seconds (1 hour)
export const revalidate = 3600;

// helpers
const removeTrailingSlash = (url: string) =>
  url.endsWith("/") ? url.slice(0, -1) : url;

// Move generatedAt outside the GET handler to fix "generatedAt" time changing on every request.
// This makes sure that while the cache is valid, the timestamp does not change.
const generatedAt = new Date().toISOString();

export async function GET(req: NextRequest) {
  const { origin } = req.nextUrl;

  // Pass fetch cache hints to Next.js for route handler caching
  const blogPostsRes = await getBlogPosts(300);

  if (!blogPostsRes.data?.data) {
    return new NextResponse("No data available", { status: 500 });
  }

  let lines: string[] = [];
  lines.push(
`---
title: Blog posts 
description: Blog posts page
---

# Blog Posts
GeneratedAt: ${generatedAt} 
`);

  blogPostsRes.data.data.forEach((p: any) => {
    const url = removeTrailingSlash(`${origin}/blog-posts/${p.slug}`);
    const keywords = Array.isArray(p.meta?.keywords)
      ? p.meta.keywords.join(", ")
      : "";

    lines.push(`## [${p.title}](${url}) 
      

**Summary:** ${p.excerpt}
${keywords ? `**Keywords:** ${keywords}` : "N/A"}
**Reading Time:** ${p.readingTime || "N/A"}
**Published At:** ${p.publishedAt || "N/A"}
**Published At:** ${p.publishedAt || "N/A"}
`);
  });

  // Use join("\n") to preserve line breaks
  return new NextResponse(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": `public, max-age=0, s-maxage=${revalidate}`, // Edge caching
    },
  });
}
