"use server";

import {
  PAGINATION_CONFIG,
  getBaseUrl,
  STATUS_TEXT,
} from "@/constants/enums";
import {
  APIResponsePaginated,
  APIResponse,
  BlogPost,
  ImageType,
  Property,
  User,
} from "@/types/types";
import { cookies } from "next/headers";
import { formatedApiErrRes, formatedSerErrRes } from "./utils";
import { API_ROUTES } from "@/constants/config";
import { revalidateTag } from "next/cache";

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
    return responseData ;
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
    const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + endpoint + id, {
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
  currentPage?: number
): Promise<APIResponsePaginated<Property[]>> => {
  try {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/properties?pageSize=${pageSize}&page=${currentPage}`;
    const response = await fetch(url, { cache: "no-cache" });
    const responseData = await response.json();
    if(!response.ok) {
      return formatedApiErrRes(responseData)
    }
    return responseData;
  } catch (error: any) {
    console.error("error in getProperties", error);
    return formatedSerErrRes("server error", error);
  }
};

export const getPropertyImages = async (
  propertyId: string,
): Promise<APIResponse<ImageType[]>> => {
  try {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}${"/images/property/"}${propertyId}`;
    const response = await fetch(url, {
      next: {tags: [`delete-image-${propertyId}`, `property-images-${propertyId}`]}
    });
    const responseData = await response.json();

    if(!response.ok) {
      return formatedApiErrRes(responseData)
    }
    return responseData;
  } catch (error: any) {
    console.error("error in getData", error);
    return formatedSerErrRes("server error", error);
  }
};

export const getProperty = async (
  slug: string
): Promise<APIResponse<Property>> => {
  try {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}${"/properties/"}${slug}`;
    const response = await fetch(url);
    const responseData = await response.json();
    if(!response.ok) {
      return formatedApiErrRes(responseData)
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
  currentPage?: number
): Promise<APIResponsePaginated<BlogPost[]>> => {
  try {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/blog-posts?pageSize=${pageSize}&page=${currentPage}`;
    const response = await fetch(url, {
      cache: "no-cache",
      // next: { revalidate: 50 },
    });
    const responseData = await response.json();
    if(!response.ok) {
      return formatedApiErrRes(responseData)
    }
    return responseData;
  } catch (error: any) {
    console.error("error in getBlog-posts", error);
    return formatedSerErrRes("server error", error);
  }
};

export const getBlogPost = async (
  blogPostId: string
): Promise<APIResponse<BlogPost>> => {
  try {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/blog-posts/${blogPostId}`;
    const response = await fetch(url, {
      cache: "no-cache",
    });
    const responseData = await response.json();
    if(!response.ok) {
      return formatedApiErrRes(responseData)
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
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/images/blog-post/${blogPostId}`;
    const response = await fetch(url, {
      next: {tags: [`blog-post-image-${blogPostId}`, `delete-image-${blogPostId}`]}
    });
    const responseData = await response.json();
    if(!response.ok) {
      return formatedApiErrRes(responseData)
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
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/users/login`;
    const response = await fetch(url, {
      method: "POST",
      body: bodyToJson,
      headers: {
        "Content-Type": "application/json",
      },
    });
    const responseData = await response.json();
    const accessToken = responseData.data?.token;
    if(!accessToken) {
      console.log(responseData)
      return responseData
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
    return responseData;
  } catch (error: any) {
    throw error;
  }
};

export const getCurrentUser = async (): Promise<
  APIResponse<Omit<User, "token">>
> => {
  try {
    const cookiesStore = await cookies()
    const token = cookiesStore.get("TOKEN")?.value;

    const response = await fetch(
      process.env.NEXT_PUBLIC_BASE_URL + API_ROUTES.USERS.CURRENT_USER,
      {
        headers: {
          Authorization: String(token),
        },
      }
    );
    const responseData = await response.json();
    if (!response.ok) {
      cookiesStore.delete("TOKEN")
      return formatedApiErrRes(responseData);
    }
    return {
      status: responseData.status || 200,
      statusText: responseData.statusText,
      msg: responseData.msg,
      data: responseData.data,
      error: null
    };
  } catch (error: any) {
    return formatedSerErrRes("server error", error);
  }
};

// delete image -> (imageId)export
export const deleteImage = async (imageId: string, ownerId: string) => {
  try {
    const token = (await cookies()).get("TOKEN")?.value;
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/images/delete/${imageId}`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: String(token),
      },
    });
    const responseData = await response.json();
    if(!response.ok) {
      return formatedApiErrRes(responseData)
    }
    revalidateTag(`delete-image-${ownerId}`, "max")
    return responseData;
  } catch (error) {
    return formatedSerErrRes("server error", error);
  }
};
