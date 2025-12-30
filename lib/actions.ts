"use server";

import { STATUS_TEXT, USER_ROLES } from "@/constants/enums";
import {
  APIResponse,
  User,
} from "@/types/types";
import { cookies } from "next/headers";
import { formatedApiErrRes, formatedSerErrRes } from "./utils";
import { API_ROUTES } from "@/constants/config";
import { revalidateTag } from "next/cache";

const { IMAGES, USERS } = API_ROUTES;

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
