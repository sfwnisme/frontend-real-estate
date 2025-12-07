export const SITE_INFO = {
  NAME: "Real Estate",
  DESCRIPTION: "Real Estate is a platform for properties listing",
  METADATABASE: `${process.env.NEXT_PUBLIC_FRONTEND_URL}`,
  COUNTRY: "SA",
  PAGES: {
    ABOUT: {
      TITLE: "Your New Home Awaits",
      DESCRIPTION:
        "We’re not just about finding you a house; we’re here to help you find your home.",
      ROUTE: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/blog`,
    },
    PROPERTIES: {
      TITLE: "Find Your Dream Home",
      DESCRIPTION:
        "Discover a curated selection of properties designed to suit every lifestyle, from cozy family homes to luxurious retreats.",
      ROUTE: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/properties`,
    },
    BLOG: {
      TITLE: "Discover insights, trends, and inspiration.",
      DESCRIPTION:
        "Explore a handpicked collection of stunning homes that reflect timeless design, innovative architecture, and unparalleled luxury.",
      ROUTE: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/blog`,
    },
  },
};

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
}

export const API_ROUTES = {
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
    CURRENT_USER: "/users/me",
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
}
