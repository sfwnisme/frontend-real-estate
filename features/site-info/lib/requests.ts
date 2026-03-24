import { formatedApiErrRes, formatedSerErrRes } from "@/lib/utils";
import { API_ROUTES } from "@/constants/config";
import { ImageType } from "@/types/types";

type SiteInfoImageRoleType = "icon" | "logo" | "og-image";
type SiteInfoImageTagType = "theme_dark" | "theme_default" | null;
const { GET_SITE_INFO_IMAGES } = API_ROUTES.IMAGES;

export const getSiteInfoImage = async (
  role: SiteInfoImageRoleType,
  tag: SiteInfoImageTagType,
) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}${GET_SITE_INFO_IMAGES}`;
    const response = await fetch(url, {
      next: {
        tags: [
          `delete-image-site-info-${role}-${tag}`,
          `create-image-site-info-${role}-${tag}`,
        ],
      },
    });
    const data = await response.json();
    if (!response.ok) {
      return formatedApiErrRes(data);
    }
    const getImageByType = data.data.find(
      (image: ImageType) => image.role === role && image.tag === tag,
    );
    return getImageByType;
  } catch (error) {
    return formatedSerErrRes("server error", error);
  }
};
