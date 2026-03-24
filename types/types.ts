import {
  BLOG_POST_STATUS,
  MODELS,
  PROPERTY_STATUS,
  PROPERTY_TYPE,
  STATUS_TEXT,
  USER_ROLES,
} from "@/constants/enums";

export type Models = (typeof MODELS)[keyof typeof MODELS];
export type StatusText = (typeof STATUS_TEXT)[keyof typeof STATUS_TEXT];
export type UserRoles = (typeof USER_ROLES)[keyof typeof USER_ROLES];
export type PropertyStatus =
  (typeof PROPERTY_STATUS)[keyof typeof PROPERTY_STATUS];
export type PropertyType = (typeof PROPERTY_TYPE)[keyof typeof PROPERTY_TYPE];
export type BlogPostStatus =
  (typeof BLOG_POST_STATUS)[keyof typeof BLOG_POST_STATUS];

type SiteInfoSchema = {
  info: {
    name: string;
    address: string;
    description: string;
  };
  seo: {
    title: string;
    description: string;
    keywords: string[];
    ogImage: string;
  };
};
export type SiteInfo = {
  ar: SiteInfoSchema;
  en: SiteInfoSchema;
  contact: {
    phone: string;
    email: string;
    facebook: string;
    instagram: string;
    x: string;
    linkedin: string;
    youtube: string;
    tiktok: string;
    snapchat: string;
    whatsapp: string;
  };
  marketing: {
    googleSearchConsole: string;
    googleTagManager: string;
    googleMerchant: string;
  };
  settings: { maintenanceMode: boolean };
  createdAt: Date;
  updatedAt: Date;
};

export type Property = {
  tempId?: string;
  _id: string;
  slug: string;
  title: string;
  description: string;
  price: number;
  propertySize: number;
  bedrooms: number;
  bathrooms: number;
  garage: number;
  garageSize: number;
  yearBuilt: number;
  propertyType: PropertyType;
  propertyStatus: PropertyStatus;
  hide: boolean;
  video: string;
  address: PropertyAddress;
  features?: string;
  createdAt: Date;
  updatedAt: Date;
};
export type PropertyAddress = {
  country: string;
  state: string;
  city: string;
  area: string;
  zipCode: string;
  other: string;
};

type MetadataType = {
  title: string;
  description: string;
  keywords: string[];
  canonicalUrl: string;
  ogImage: string;
  ogType: string;
  twitterCard: string;
};
export type BlogPost = {
  tempId?: string;
  _id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  status: BlogPostStatus;
  meta: MetadataType;
  readingTime: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
};
export type User = {
  _id: string;
  name: string;
  email: string;
  role: UserRoles;
  token?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type Pagination = {
  page: number;
  nextPage: number | null;
  prevPage: number | null;
  pageSize: number;
  totalPages: number;
  totalData: number;
};
// Base pagination wrapper
export type PaginationResponseType<T> = {
  page: number;
  nextPage: number | null;
  prevPage: number | null;
  pageSize: number;
  totalPages: number;
  totalData: number;
  data: T;
};

// The full API response shape (for paginated endpoints)
export type PaginatedApiResponse<T> = {
  status: number;
  statusText: StatusText;
  msg: string;
  data: PaginationResponseType<T>;
  error: null;
};

export type ApiSuccessResponse<T> = {
  status: number;
  statusText: StatusText;
  msg: any;
  data: T | null;
  error: null;
};
export type ApiErrorResponse = {
  status: number;
  statusText: StatusText;
  msg: { [key: string]: string } | { [key: string]: string }[] | string;
  data: null;
  error: string;
};

export type APIResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;
export type APIResponsePaginated<T> = APIResponse<PaginationResponseType<T>>;
export type ImageType = {
  _id: string;
  url: string;
  fileName: string;
  ownerModel: Models;
  ownerId: string;
  mimeType: string;
  size: number;
  dimensions: {
    width: number;
    height: number;
  };
  isFeatured: boolean;
  isTemp: boolean;
  role: string | null;
  tag: string | null;
  alt: string | null;
  createdAt: Date;
  updatedAt: Date;
};
export type OgImageType = {
  url: string;
  width: number;
  height: number;
  alt: string;
  type: string;
};

export type SearchParamsType = Promise<{ [key: string]: string | undefined }>;
export type SlugParamsType = Promise<{ slug: string }>;
