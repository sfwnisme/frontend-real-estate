"use server";
import {
  formatedApiErrRes,
  formatedSerErrRes,
  strToArrElms,
} from "@/lib/utils";
import { APIResponse, BlogPost, ImageType } from "@/types/types";
import { cookies } from "next/headers";
import { CreateBlogPostType, UpdateBlogPostType } from "../schema/blog-post-schema";
import { API_ROUTES } from "@/constants/config";
import { revalidateTag } from "next/cache";

const { CREATE, UPDATE, DELETE, UPDATE_SLUG } = API_ROUTES.BLOG_POSTS;
const { CREATE_BLOG_POST_IMAGE, CREATE_TEMP_BLOG_POST_IMAGE } =
  API_ROUTES.IMAGES;

export const createBlogPost = async (
  blogPostData: CreateBlogPostType
): Promise<APIResponse<BlogPost>> => {
  try {
    const token = (await cookies()).get("TOKEN")?.value;
    const {
      meta: { keywords, ...metaRest },
      ...rest
    } = blogPostData;
    const keywordsArr = strToArrElms(keywords);
    const refinedData = {
      ...rest,
      meta: {
        ...metaRest,
        keywords: keywordsArr,
      },
    };
    const bodyToJson = JSON.stringify(refinedData);
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}${CREATE}`;
    const response = await fetch(url, {
      method: "POST",
      body: bodyToJson,
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
  } catch (error) {
    return formatedSerErrRes("server error", error);
  }
};

export const createTempBlogPostImage = async (
  image: File,
  tempId: string
): Promise<APIResponse<ImageType>> => {
  try {
    const FD = new FormData();
    FD.append("file", image);
    FD.append("tempId", tempId);
    const token = (await cookies()).get("TOKEN")?.value;
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}${CREATE_TEMP_BLOG_POST_IMAGE}`;
    const response = await fetch(url, {
      method: "POST",
      body: FD,
      headers: {
        Authorization: String(token),
      },
    });
    const responseData = await response.json();
    if (!response.ok) {
      return formatedApiErrRes(responseData);
    }
    return responseData;
  } catch (error) {
    return formatedSerErrRes("server error", error);
  }
};

export const createBlogPostImage = async (
  image: File,
  blogPostId: string
): Promise<APIResponse<ImageType>> => {
  try {
    const FD = new FormData();
    FD.append("file", image);
    FD.append("blogPostId", blogPostId);
    const token = (await cookies()).get("TOKEN")?.value;
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}${CREATE_BLOG_POST_IMAGE}`;
    const response = await fetch(url, {
      method: "POST",
      body: FD,
      headers: {
        Authorization: String(token),
      },
    });
    const responseData = await response.json();
    if (!response.ok) {
      return formatedApiErrRes(responseData);
    }
    revalidateTag(`blog-post-image-${blogPostId}`, "max");
    return responseData;
  } catch (error) {
    return formatedSerErrRes("server error", error);
  }
};

export const updateBlogPost = async (
  blogPostData: UpdateBlogPostType,
  blogPostId: string
): Promise<APIResponse<BlogPost>> => {
  try {
    const token = (await cookies()).get("TOKEN")?.value;
    const bodyToJson = JSON.stringify(blogPostData);
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}${UPDATE}/${blogPostId}`;
    const response = await fetch(url, {
      method: "PATCH",
      body: bodyToJson,
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
  } catch (error) {
    return formatedSerErrRes("server error", error);
  }
};

export const updateBlogPostSlug = async (
  blogPostId: string,
  slug: string
): Promise<APIResponse<BlogPost>> => {
  try {
    const token = (await cookies()).get("TOKEN")?.value;
    const bodyToJson = JSON.stringify({ blogPostId, slug });
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}${UPDATE_SLUG}`;
    const response = await fetch(url, {
      method: "PATCH",
      body: bodyToJson,
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
  } catch (error) {
    return formatedSerErrRes("server error", error);
  }
};

export const deleteBlogPost = async (blogPostId: string) => {
  try {
    const token = (await cookies()).get("TOKEN")?.value;
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}${DELETE}/${blogPostId}`;
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
    return responseData;
  } catch (error) {
    return error;
  }
};
