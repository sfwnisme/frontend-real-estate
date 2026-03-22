"use server";

import { API_ROUTES } from "@/constants/config";
import { formatedApiErrRes, formatedSerErrRes } from "@/lib/utils";
import { APIResponse, ImageType, SiteInfo } from "@/types/types";
import { cookies } from "next/headers";
import { UpdateSiteInfoType } from "../schema/site-info-schema";
import { updateTag } from "next/cache";

const { UPDATE } = API_ROUTES.SITE_INFO;
const {
  CREATE_SITE_INFO_ICON,
  CREATE_SITE_INFO_ICON_DARK,
  CREATE_SITE_INFO_LOGO,
  CREATE_SITE_INFO_LOGO_DARK,
  CREATE_SITE_INFO_OG_IMAGE,
} = API_ROUTES.IMAGES;

export const updateSiteInfo = async (
  siteInfo: UpdateSiteInfoType,
): Promise<APIResponse<UpdateSiteInfoType>> => {
  try {
    const token = (await cookies()).get("TOKEN")?.value;
    const bodyToJson = JSON.stringify(siteInfo);
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}${UPDATE}`;
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

export const createSiteInfoIcon = async (
  file: File,
): Promise<APIResponse<ImageType>> => {
  try {
    const token = (await cookies()).get("TOKEN")?.value;
    const FD = new FormData();
    FD.append("file", file);
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}${CREATE_SITE_INFO_ICON}`;
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
    updateTag(`create-image-site-info-${responseData.data?.role}-${responseData.data?.tag}`)
    return responseData;
  } catch (error) {
    return formatedSerErrRes("server error", error);
  }
};

export const createSiteInfoIconDark = async (
  file: File,
): Promise<APIResponse<ImageType>> => {
  try {
    const token = (await cookies()).get("TOKEN")?.value;
    const FD = new FormData();
    FD.append("file", file);
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}${CREATE_SITE_INFO_ICON_DARK}`;
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

export const createSiteInfoLogo = async (
  file: File,
): Promise<APIResponse<ImageType>> => {
  try {
    const token = (await cookies()).get("TOKEN")?.value;
    const FD = new FormData();
    FD.append("file", file);
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}${CREATE_SITE_INFO_LOGO}`;
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

export const createSiteInfoLogoDark = async (
  file: File,
): Promise<APIResponse<ImageType>> => {
  try {
    const token = (await cookies()).get("TOKEN")?.value;
    const FD = new FormData();
    FD.append("file", file);
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}${CREATE_SITE_INFO_LOGO_DARK}`;
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

export const createSiteInfoOgImage = async (
  file: File,
): Promise<APIResponse<ImageType>> => {
  try {
    const token = (await cookies()).get("TOKEN")?.value;
    const FD = new FormData();
    FD.append("file", file);
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}${CREATE_SITE_INFO_OG_IMAGE}`;
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
