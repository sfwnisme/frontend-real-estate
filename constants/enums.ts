//----------------------------
// enum values for the entire application
//----------------------------

// Getter function for environment variable (HMR-safe)
export const getBaseUrl = () => {
  const url = process.env.NEXT_PUBLIC_BASE_URL;
  if (!url) {
    console.error("NEXT_PUBLIC_BASE_URL is not defined in .env");
    return "http://localhost:8000/api"; // Fallback
  }
  return url;
};

export const PAGINATION_CONFIG = {
  PROPERTIES: {
    CLIENT: {
      OVERVIEW: 3,
      PAGE: 9,
    },
    DASHBOARD: 9,
  },
  BLOG: {
    CLIENT: {
      OVERVIEW: 3,
      PAGE: 9,
    },
    DASHBOARD: 9,
  },
  
};

export const STATUS_TEXT = {
  SUCCESS: "success",
  FAIL: "fail",
  ERROR: "error",
} as const;

export const USER_ROLES = {
  ADMIN: "admin",
  MANAGER: "manager",
  CONTENT: "content",
  VIEW_ONLY: "view_only",
} as const;

export const USER_ROLES_READABLE = {
  [USER_ROLES.ADMIN]: "admin",
  [USER_ROLES.MANAGER]: "manager",
  [USER_ROLES.CONTENT]: "content",
  [USER_ROLES.VIEW_ONLY]: "viewer",
} as const;

export const PROPERTY_TYPE = {
  HOUSE: "house",
  APARTMENT: "apartment",
  VILLA: "villa",
  STUDIO: "studio",
  CHALET: "chalet",
} as const;
export const PROPERTY_STATUS = {
  FOR_SALE: "for_sale",
  FOR_RENT: "for_rent",
  SOLD: "sold",
  RENTED: "rented",
} as const;
export const BLOG_POST_STATUS = {
  DRAFT: "draft",
  PUBLISHED: "published",
} as const;

export const OG_TYPES = {
  // 1. General Website and Core Content
  WEBSITE: "website", // For Homepages, Search Results, About Us, etc.
  ARTICLE: "article", // For Blog Posts (as you are currently using)
  PROFILE: "profile", // For user profile pages (agents, users)
  // 2. Real Estate Specific (Using 'place' and 'product' concepts)
  // NOTE: There is no official 'real_estate' type; 'product' or 'place' are used.
  PRODUCT: "product", // A strong option for listings (e.g., a house for sale)
  PLACE: "place", // For the location of a specific property or office
  // 3. Business Information
  BUSINESS: "business.business", // For the 'About Us' page or company profile
  // 4. Media (If you share video tours)
  VIDEO_MOVIE: "video.movie", // For full-length property tours
  VIDEO_CLIP: "video.other", // For short video clips or reels
} as const;

export const TWITTER_CARD_TYPES = {
  SUMMARY: "summary",
  SUMMARY_LARGE_IMAGE: "summary_large_image",
  PLAYER: "player",
  APP: "app",
} as const;

export const FILES_CONFIGS = {
  DIRS: {
    DEFAULT: "default",
    IMAGES: "images/",
    PROPERTIES: "properties/",
    SERVICES: "services/",
    BLOG: "blog/",
  },
  IMAGE: {
    MAX_SIZE: 3,
    MAX_LENGTH: 2,
  },
  PDF: {
    MAX_SIZE: 6,
    MAX_LENGTH: 2,
  },
} as const;

export const MODELS = {
  PROPERTY: "Property",
  BLOG_POST: "BlogPost",
  USER: "User",
} as const;
