"use server";

import { API_ROUTES } from "@/constants/config";
import { formatedApiErrRes, formatedSerErrRes } from "@/lib/utils";
import { APIResponse, SiteInfo } from "@/types/types";
import { cookies } from "next/headers";
import { UpdateSiteInfoType } from "../schema/site-info-schema";

const { UPDATE } = API_ROUTES.SITE_INFO;
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
