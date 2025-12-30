import { PAGINATION_CONFIG } from "@/constants/enums";
import {
  APIResponsePaginated,
  APIResponse,
  BlogPost,
  ImageType,
  Property,
} from "@/types/types";
import { formatedApiErrRes, formatedSerErrRes } from "./utils";
import { API_ROUTES } from "@/constants/config";

const { PROPERTIES, BLOG_POSTS, IMAGES } = API_ROUTES;

export const getData = async <T>(
  endpoint: string,
  query?: string
): Promise<APIResponsePaginated<any>> => {
  try {
    if (!process.env.NEXT_PUBLIC_BASE_URL) {
      throw new Error("process.env.NEXT_PUBLIC_BASE_URL is not defined");
    }
    const queryParams = query ? query : "";
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}${endpoint}${queryParams}`;
    const response = await fetch(url);
    const responseData = await response.json();
    return responseData;
  } catch (error: any) {
    console.error("error in getData", error);
    return formatedSerErrRes("server error", error);
  }
};

//-------------------------------
// PROPERTIES REQUESTS
//-------------------------------
export const getProperties = async (
  pageSize: number = PAGINATION_CONFIG.PROPERTIES.CLIENT.PAGE,
  currentPage?: number,
  cache: RequestCache = "no-store"
): Promise<APIResponsePaginated<Property[]>> => {
  try {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}${PROPERTIES.GET}?pageSize=${pageSize}&page=${currentPage}`;
    const response = await fetch(url, { cache });
    const responseData = await response.json();
    if (!response.ok) {
      return formatedApiErrRes(responseData);
    }
    return responseData;
  } catch (error: any) {
    console.error("error in getProperties", error);
    return formatedSerErrRes("server error", error);
  }
};

export const getPropertiesWithRevalidate = async (
  pageSize: number = PAGINATION_CONFIG.PROPERTIES.CLIENT.PAGE,
  currentPage?: number,
  revalidate: number = 60
): Promise<APIResponsePaginated<Property[]>> => {
  try {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}${PROPERTIES.GET}?pageSize=${pageSize}&page=${currentPage}`;
    const response = await fetch(url, { next: { revalidate } });
    const responseData = await response.json();
    if (!response.ok) {
      return formatedApiErrRes(responseData);
    }
    return responseData;
  } catch (error: any) {
    console.error("error in getProperties", error);
    return formatedSerErrRes("server error", error);
  }
};

export const getPropertyImages = async (
  propertyId: string
): Promise<APIResponse<ImageType[]>> => {
  try {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}${IMAGES.GET_PROPERTY_IMAGES}/${propertyId}`;
    const response = await fetch(url, {
      next: {
        tags: [`delete-image-${propertyId}`, `property-images-${propertyId}`],
      },
    });
    const responseData = await response.json();

    if (!response.ok) {
      return formatedApiErrRes(responseData);
    }
    return responseData;
  } catch (error: any) {
    console.error("error in getData", error);
    return formatedSerErrRes("server error", error);
  }
};

export const getPropertyImagesWithRevalidate = async (
  propertyId: string,
  revalidate: number = 60
): Promise<APIResponse<ImageType[]>> => {
  try {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}${IMAGES.GET_PROPERTY_IMAGES}/${propertyId}`;
    const response = await fetch(url, {
      next: {
        revalidate,
        tags: [`delete-image-${propertyId}`, `property-images-${propertyId}`],
      },
    });
    const responseData = await response.json();

    if (!response.ok) {
      return formatedApiErrRes(responseData);
    }
    return responseData;
  } catch (error: any) {
    console.error("error in getData", error);
    return formatedSerErrRes("server error", error);
  }
};

export const getProperty = async (
  slug: string,
  cache: RequestCache = "no-store"
): Promise<APIResponse<Property>> => {
  try {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}${PROPERTIES.GET}/${slug}`;
    const response = await fetch(url, { cache });
    const responseData = await response.json();
    if (!response.ok) {
      return formatedApiErrRes(responseData);
    }
    return responseData;
  } catch (error: any) {
    console.error("error in getData", error);
    return formatedSerErrRes("server error", error);
  }
};

export const getPropertyWithRevalidate = async (
  slug: string,
  revalidate: number = 60
): Promise<APIResponse<Property>> => {
  try {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}${PROPERTIES.GET}/${slug}`;
    const response = await fetch(url, { next: { revalidate } });
    const responseData = await response.json();
    if (!response.ok) {
      return formatedApiErrRes(responseData);
    }
    return responseData;
  } catch (error: any) {
    console.error("error in getData", error);
    return formatedSerErrRes("server error", error);
  }
};

//-------------------------------
// BLOG POSTS REQUESTS
//-------------------------------
export const getBlogPosts = async (
  pageSize: number = PAGINATION_CONFIG.BLOG.CLIENT.PAGE,
  currentPage?: number,
  cache: RequestCache = "no-store"
): Promise<APIResponsePaginated<BlogPost[]>> => {
  try {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}${BLOG_POSTS.GET}?pageSize=${pageSize}&page=${currentPage}`;
    const response = await fetch(url, { cache });
    const responseData = await response.json();
    if (!response.ok) {
      return formatedApiErrRes(responseData);
    }
    return responseData;
  } catch (error: any) {
    console.error("error in getBlog-posts", error);
    return formatedSerErrRes("server error", error);
  }
};

export const getBlogPostsWithRevalidate = async (
  pageSize: number = PAGINATION_CONFIG.BLOG.CLIENT.PAGE,
  currentPage?: number,
  revalidate: number = 60
): Promise<APIResponsePaginated<BlogPost[]>> => {
  try {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}${BLOG_POSTS.GET}?pageSize=${pageSize}&page=${currentPage}`;
    const response = await fetch(url, { next: { revalidate } });
    const responseData = await response.json();
    if (!response.ok) {
      return formatedApiErrRes(responseData);
    }
    return responseData;
  } catch (error: any) {
    console.error("error in getBlog-posts", error);
    return formatedSerErrRes("server error", error);
  }
};

export const getBlogPost = async (
  blogPostId: string,
  cache: RequestCache = "no-store"
): Promise<APIResponse<BlogPost>> => {
  try {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}${BLOG_POSTS.GET}/${blogPostId}`;
    const response = await fetch(url, { cache });
    const responseData = await response.json();
    if (!response.ok) {
      return formatedApiErrRes(responseData);
    }
    return responseData;
  } catch (error: any) {
    console.error("error in getBlog-posts", error);
    return formatedSerErrRes("server error", error);
  }
};

export const getBlogPostWithRevalidate = async (
  blogPostId: string,
  revalidate: number = 60
): Promise<APIResponse<BlogPost>> => {
  try {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}${BLOG_POSTS.GET}/${blogPostId}`;
    const response = await fetch(url, { next: { revalidate } });
    const responseData = await response.json();
    if (!response.ok) {
      return formatedApiErrRes(responseData);
    }
    return responseData;
  } catch (error: any) {
    console.error("error in getBlog-posts", error);
    return formatedSerErrRes("server error", error);
  }
};

export const getBlogPostImage = async (
  blogPostId: string
): Promise<APIResponse<ImageType>> => {
  try {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}${IMAGES.GET_BLOG_POST_IMAGES}/${blogPostId}`;
    const response = await fetch(url, {
      next: {
        tags: [`blog-post-image-${blogPostId}`, `delete-image-${blogPostId}`],
      },
    });
    const responseData = await response.json();
    if (!response.ok) {
      return formatedApiErrRes(responseData);
    }
    return responseData;
  } catch (error: any) {
    console.error("error in getBlog-posts", error);
    return formatedSerErrRes("server error", error);
  }
};