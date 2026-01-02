"use server";

import { formatedSerErrRes } from "@/lib/utils";
import { APIResponse, User } from "@/types/types";
import { cookies } from "next/headers";
import { CreateUserType, UpdateUserType } from "../schema/user-schema";
import { API_ROUTES } from "@/constants/config";

const { CREATE, GET, DELETE, UPDATE } = API_ROUTES.USERS;

export const getUsers = async (): Promise<APIResponse<User[]>> => {
  try {
    const token = (await cookies()).get("TOKEN")?.value;
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}${GET}`;
    const response = await fetch(url, {
      headers: {
        Authorization: String(token),
      },
    });
    const responseData = await response.json();
    return responseData;
  } catch (error: any) {
    console.error("error in getUsers", error);
    return formatedSerErrRes("server error", error);
  }
};

export const getUser = async (userId: string): Promise<APIResponse<User>> => {
  try {
    const token = (await cookies()).get("TOKEN")?.value;
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}${GET}/${userId}`;
    const response = await fetch(url, {
      headers: {
        Authorization: String(token),
      },
    });
    const responseData = await response.json();
    return responseData;
  } catch (error: any) {
    console.error("error in getUsers", error);
    return formatedSerErrRes("server error", error);
  }
};

export const createUser = async (
  userData: CreateUserType
): Promise<APIResponse<User>> => {
  try {
    const token = (await cookies()).get("TOKEN")?.value;
    const bodyToJson = JSON.stringify(userData);
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
    return responseData;
  } catch (error) {
    return formatedSerErrRes("server error", error);
  }
};

export const updateUser = async (userData: UpdateUserType, userId: string) => {
  try {
    const token = (await cookies()).get("TOKEN")?.value;
    const bodyToJson = JSON.stringify(userData);
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}${UPDATE}/${userId}`;
    const response = await fetch(url, {
      method: "PATCH",
      body: bodyToJson,
      headers: {
        "Content-Type": "application/json",
        Authorization: String(token),
      },
    });
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    return formatedSerErrRes("server error", error);
  }
};

export const deleteUser = async (userId: string) => {
  try {
    const token = (await cookies()).get("TOKEN")?.value;
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}${DELETE}/${userId}`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: String(token),
      },
    });
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    return formatedSerErrRes("server error", error);
  }
};

export const logOut = async () => {
  (await cookies()).delete("TOKEN");
  (await cookies()).delete("USER_ROLE");
};
