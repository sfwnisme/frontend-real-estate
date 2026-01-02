"use server";

import { getBaseUrl, STATUS_TEXT } from "@/constants/enums";
import { formatedApiErrRes, formatedSerErrRes } from "@/lib/utils";
import { APIResponse, ImageType, Property } from "@/types/types";
import { cookies } from "next/headers";
import { API_ROUTES } from "@/constants/config";
import { UpdatePropertyType } from "../schema/update-property-schema";
import { CreatePropertyWithImagesType } from "../schema/create-property-with-images-schema";
import { revalidateTag } from "next/cache";

// update slug

const { GET, CREATE, UPDATE, UPDATE_SLUG, DELETE } = API_ROUTES.PROPERTIES;
const { MAKE_IMAGE_FEATURED, CREATE_TEMP_PROPERTY_IMAGE, CREATE_PROPERTY_IMAGE } = API_ROUTES.IMAGES;

export const createProperty = async (
  propertyData: Omit<CreatePropertyWithImagesType, "images">
): Promise<APIResponse<Property>> => {
  try {
    const token = (await cookies()).get("TOKEN")?.value;
    const bodyToJson = JSON.stringify(propertyData);
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
    console.log("property created successfully", responseData);
    return responseData;
  } catch (error) {
    return formatedSerErrRes("server error", error);
  }
};

export const createTempPropertyImage = async (
  data: FormData
): Promise<APIResponse<ImageType>> => {
  try {
    const token = (await cookies()).get("TOKEN")?.value;
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}${CREATE_TEMP_PROPERTY_IMAGE}`;
    const response = await fetch(url, {
      method: "POST",
      body: data,
      headers: {
        Authorization: String(token),
      },
    });
    const responseData = await response.json();
    if (!response.ok) {
      return formatedApiErrRes(responseData);
    }
    console.log("images response data from requests", responseData);
    return responseData;
  } catch (error) {
    return formatedSerErrRes("server error", error);
  }
};

export const createMultiTempPropertyImage = async (
  images: File[],
  tempId: string
): Promise<APIResponse<ImageType[]>> => {
  try {
    const token = (await cookies()).get("TOKEN")?.value;
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/images/create-temp-property-image`;
    const controller = new AbortController();

    // Send all images as separate requests and collect JSON responses
    const responses = await Promise.all(
      images.map(async (image) => {
        const FD = new FormData();
        FD.append("file", image);
        FD.append("tempId", tempId);

        const response = await fetch(url, {
          method: "POST",
          body: FD,
          headers: {
            Authorization: String(token),
          },
          signal: controller.signal,
        });

        const responseData = await response.json();
        if (!response.ok) {
          return formatedApiErrRes(responseData);
        }
        return responseData;
      })
    );

    // If any response is an error, return the first error
    const errorResponse = responses.find(
      (res) => !(res as APIResponse<ImageType>).status || (res as any).error
    );
    if (errorResponse) {
      return errorResponse as APIResponse<ImageType[]>;
    }

    // Return all image data in an array with a success status
    return {
      status: 200,
      statusText: STATUS_TEXT.SUCCESS,
      msg: "All images uploaded successfully",
      data: responses as ImageType[],
      error: null,
    };
  } catch (error) {
    return formatedSerErrRes("server error", error);
  }
};

export const createPropertyImage = async (
  image: File,
  propertyId: string,
  isFeatured: boolean = false
): Promise<APIResponse<ImageType>> => {
  try {
    const FD = new FormData();
    FD.append("file", image);
    FD.append("propertyId", propertyId);
    FD.append("isFeatured", String(isFeatured));
    const token = (await cookies()).get("TOKEN")?.value;
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}${CREATE_PROPERTY_IMAGE}`;
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
    revalidateTag(`property-images-${propertyId}`, "max");
    return responseData;
  } catch (error) {
    return formatedSerErrRes("server error", error);
  }
};

export const setFeaturedImage = async(imageId: string, ownerId: string): Promise<APIResponse<ImageType>> => {
  try {
    const token = (await cookies()).get("TOKEN")?.value;
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}${MAKE_IMAGE_FEATURED}`;
    const bodyToJson = JSON.stringify({ imageId, ownerId });
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
    revalidateTag(`property-images-${ownerId}`, "max");
    return responseData;
  } catch (error) {
    return formatedSerErrRes("server error", error);
  }
}

export const updateProperty = async (
  propertyData: UpdatePropertyType,
  propertyId: string
): Promise<APIResponse<Property>> => {
  try {
    const token = (await cookies()).get("TOKEN")?.value;
    const bodyToJson = JSON.stringify(propertyData);
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}${UPDATE}/${propertyId}`;
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

export const updatePropertySlug = async (
  propertyId: string,
  slug: string
): Promise<APIResponse<Property>> => {
  try {
    const token = (await cookies()).get("TOKEN")?.value;
    const bodyToJson = JSON.stringify({ propertyId, slug });
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

export const deleteProperty = async (
  propertyId: string
): Promise<APIResponse<null>> => {
  try {
    const token = (await cookies()).get("TOKEN")?.value;
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}${DELETE}/${propertyId}`;
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
    return formatedSerErrRes("server error", error);
  }
};
