export const WEBSITE_URL = process.env.NEXT_PUBLIC_FRONTEND_URL;
export const WEBSITE_URL_EN = process.env.NEXT_PUBLIC_FRONTEND_URL + "/en";
export const WEBSITE_URL_AR = process.env.NEXT_PUBLIC_FRONTEND_URL;

export const PAGES_ROUTES = {
  PROPERTIES: {
    PREVIEW: "/properties",
    CREATE: "/dashboard/properties/create",
    UPDATE: "/dashboard/properties/update",
  },
  BLOG_POSTS: {
    PREVIEW: "/blog-posts",
    CREATE: "/dashboard/blog-posts/create",
    UPDATE: "/dashboard/blog-posts/update",
  },
  USERS: {
    PREVIEW: "/dashboard/users",
    CREATE: "/dashboard/users/create",
    UPDATE: "/dashboard/users/update",
  },
  ABOUT: {
    PREVIEW: "/about",
  },
  CONTACT: {
    PREVIEW: "/contact",
  },
};

export const API_ROUTES = {
  SITE_INFO: {
    GET: "/site-info",
  },
  PROPERTIES: {
    GET: "/properties",
    CREATE: "/properties/create",
    UPDATE: "/properties",
    UPDATE_SLUG: "/properties/update-slug",
    DELETE: "/properties/delete",
  },
  BLOG_POSTS: {
    GET: "/blog-posts",
    CREATE: "/blog-posts/create",
    UPDATE: "/blog-posts",
    UPDATE_SLUG: "/blog-posts/update-slug",
    DELETE: "/blog-posts/delete",
  },
  USERS: {
    GET: "/users",
    GET_CURRENT_USER: "/users/me",
    LOGIN: "/users/login",
    CREATE: "/users/register",
    UPDATE: "/users",
    DELETE: "/users/delete",
  },
  IMAGES: {
    GET: "/images/users",
    GET_PROPERTY_IMAGES: "/images/property",
    MAKE_IMAGE_FEATURED: "/images/make-image-featured",
    CREATE_PROPERTY_IMAGE: "/images/create-property-image",
    CREATE_TEMP_PROPERTY_IMAGE: "/images/create-temp-property-image",
    GET_BLOG_POST_IMAGES: "/images/blog-post",
    CREATE_BLOG_POST_IMAGE: "/images/create-blog-post-image",
    CREATE_TEMP_BLOG_POST_IMAGE: "/images/create-temp-blog-post-image",
    DELETE: "/images/delete",
  },
};

export const REVALIDATE_TIMES = {
  PROPERTIES: 3600, // 1 hour
  BLOG_POSTS: 3600, // 1 hour
  USERS: 60, // 1 minute
  IMAGES: 60, // 1 minute
  PROPERTY_IMAGES: 3600, // 1 hour
  BLOG_POST_IMAGES: 3600, // 1 hour
};
