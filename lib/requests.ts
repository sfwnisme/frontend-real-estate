"use server";

import { API_ROUTES } from "@/constants/config";
import { PAGINATION_CONFIG, STATUS_TEXT, USER_ROLES } from "@/constants/enums";
import {
  APIResponse,
  APIResponsePaginated,
  BlogPost,
  ImageType,
  Property,
  User,
} from "@/types/types";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { formatedApiErrRes, formatedSerErrRes } from "./utils";

const { PROPERTIES, BLOG_POSTS, IMAGES, USERS } = API_ROUTES;

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

export const deleteDataByQueryParams = async (
  endpoint: string,
  id: string | null
): Promise<APIResponse<undefined>> => {
  try {
    if (!id) {
      return {
        status: 404,
        statusText: STATUS_TEXT.ERROR,
        msg: "id not found",
        data: null,
        error: "the id query is not found",
      };
    }
    const token = (await cookies()).get("TOKEN")?.value;
    const response = await fetch(
      process.env.NEXT_PUBLIC_BASE_URL + endpoint + id,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: String(token),
        },
      }
    );
    const responseData = await response.json();

    if (!response.ok) {
      return formatedApiErrRes(responseData);
    }
    return responseData;
  } catch (error: any) {
    return formatedSerErrRes(
      "Client Error > lib/requests.ts/deleteData",
      error
    );
  }
};

//-------------------------------
// PROPERTIES REQUESTS
//-------------------------------
export const getProperties = async (
  pageSize: number = PAGINATION_CONFIG.PROPERTIES.CLIENT.PAGE,
  currentPage?: number,
  cache: RequestCache = "no-store",
  includeHidden: boolean = false
): Promise<APIResponsePaginated<Property[]>> => {
  try {
    const hiddenParam = includeHidden ? "" : "&hide=false";
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}${PROPERTIES.GET}?pageSize=${pageSize}&page=${currentPage}${hiddenParam}`;
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

//-------------------------------
// AUTH REQUESTS
//-------------------------------
export const login = async (
  email: string,
  password: string
): Promise<APIResponse<User>> => {
  try {
    const cookieStore = await cookies();
    const bodyToJson = JSON.stringify({ email, password });
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}${USERS.LOGIN}`;
    const response = await fetch(url, {
      method: "POST",
      body: bodyToJson,
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });
    const responseData = await response.json();
    const accessToken = responseData.data?.token;
    if (!accessToken) {
      console.log(responseData);
      return responseData;
    }
    cookieStore.set({
      name: "TOKEN",
      value: "Bearer " + accessToken,
      httpOnly: true,
      sameSite: "strict",
      path: "/",
      secure: true,
      priority: "high",
    });
    cookieStore.set({
      name: "USER_ROLE",
      value: responseData.data?.role || USER_ROLES.VIEW_ONLY,
      httpOnly: true,
      sameSite: "strict",
      path: "/",
      secure: true,
      priority: "high",
    });
    return responseData;
  } catch (error: any) {
    throw error;
  }
};

export const getCurrentUser = async (): Promise<
  APIResponse<Omit<User, "token">>
> => {
  try {
    const cookiesStore = await cookies();
    const token = cookiesStore.get("TOKEN")?.value;

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}${USERS.GET_CURRENT_USER}`,
      {
        cache: "no-store",
        headers: {
          Authorization: String(token),
        },
      }
    );
    const responseData = await response.json();
    if (!response.ok) {
      cookiesStore.delete("TOKEN");
      return formatedApiErrRes(responseData);
    }
    return {
      status: responseData.status || 200,
      statusText: responseData.statusText,
      msg: responseData.msg,
      data: responseData.data,
      error: null,
    };
  } catch (error: any) {
    return formatedSerErrRes("server error", error);
  }
};

// delete image -> (imageId)export
export const deleteImage = async (imageId: string, ownerId: string) => {
  try {
    const token = (await cookies()).get("TOKEN")?.value;
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}${IMAGES.DELETE}/${imageId}`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: String(token),
      },
    });
    const responseData = await response.json();
    if (!response.ok) {
      return formatedApiErrRes(responseData);
    }
    revalidateTag(`delete-image-${ownerId}`, "max");
    return responseData;
  } catch (error) {
    return formatedSerErrRes("server error", error);
  }
};
