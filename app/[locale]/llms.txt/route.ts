import { getBlogPosts, getProperties } from "@/lib/requests";
import { NextRequest, NextResponse } from "next/server";

// helpers
const removeTrailingSlash = (url: string) => {
  return url.endsWith("/") ? url.slice(0, -1) : url;
};
const generatedAt = new Date().toISOString();

export async function GET(req: NextRequest) {
  const { origin } = req.nextUrl;
  const [blogPostsRes, propertiesRes] = await Promise.all([
    getBlogPosts(300),
    getProperties(300),
  ]);

  let lines: string[] = [];
  lines.push("# Real Estate Business Website");
  lines.push(`Generated at: ${generatedAt}\n`);

  lines.push("## Blog Posts \n");
  if (!blogPostsRes.data?.data || !propertiesRes.data?.data) {
    return new NextResponse("No data available", { status: 500 });
  }

  lines = lines.concat(
    blogPostsRes.data.data.map((p: any) =>
      removeTrailingSlash(`source_url: 
  html:${origin}/blog-posts/${p.slug}
  md:${origin}/blog-posts/${p.slug}/llms.md`)
    )
  );
  lines.push("\n## Properties \n");
  lines = lines.concat(
    propertiesRes.data.data.map((p: any) =>
      removeTrailingSlash(`source_url: 
  html:${origin}/properties/${p.slug}
  md:${origin}/properties/${p.slug}/llms.md
        `)
    )
  );

  return new NextResponse(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
