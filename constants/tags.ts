export const TAGS = {
  UPDATED_SITE_INFO: "updated-site-info",

  PROPERTIES: "properties",
  PROPERTY: (id: string) => `property-${id}`,
  PROPERTY_IMAGES: (id: string) => `property-images-${id}`,

  BLOG_POSTS: "blog-posts",
  BLOG_POST: (id: string) => `blog-post-${id}`,
  BLOG_POST_IMAGES: (id: string) => `blog-post-images-${id}`,
} as const;
