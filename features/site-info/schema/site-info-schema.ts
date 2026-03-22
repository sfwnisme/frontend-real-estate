import { SITE_INFO_IMAGES_CONFIG } from "@/constants/enums";
import { kbToBytes, unitToBytes } from "@/lib/utils";
import z from "zod";

const InfoSchema = z.object({
  info: z.object({
    name: z.string().min(1, { message: "field is required" }),
    address: z.string().min(2, { message: "field is required" }),
    description: z.string().min(15, { message: "field is required" }),
  }),
  seo: z.object({
    title: z.string().min(1, { message: "field is required" }),
    description: z.string().min(15, { message: "field is required" }),
    keywords: z.array(z.string()).min(1, { message: "field is required" }),
    ogImage: z.string().min(1, { message: "field is required" }),
  }),
});

const ContactSchema = z.object({
  phone: z.string().min(1, { message: "field is required" }),
  email: z.string().email({ message: "invalid email address" }),
  facebook: z.string().optional(),
  instagram: z.string().optional(),
  x: z.string().optional(),
  linkedin: z.string().optional(),
  youtube: z.string().optional(),
  tiktok: z.string().optional(),
  snapchat: z.string().optional(),
  whatsapp: z.string().optional(),
});

const MarketingSchema = z.object({
  googleSearchConsole: z.string().optional(),
  googleTagManager: z.string().optional(),
  googleMerchant: z.string().optional(),
});

const SettingsSchema = z.object({
  maintenanceMode: z.boolean().optional(),
});

export const SiteInfoSchema = z.object({
  ar: InfoSchema,
  en: InfoSchema,
  contact: ContactSchema,
  marketing: MarketingSchema,
  settings: SettingsSchema,
});

export const CreateSiteInfoIconSchema = z.object({
  icon: z
    .file()
    .max(
      unitToBytes(SITE_INFO_IMAGES_CONFIG.ICON.MAX_FILE_SIZE, "mb"),
      `maximum size is ${SITE_INFO_IMAGES_CONFIG.ICON.MAX_FILE_SIZE}MB`,
    )
    .mime(
      SITE_INFO_IMAGES_CONFIG.ICON.MIME_TYPES,
      `only accept ${SITE_INFO_IMAGES_CONFIG.ICON.MIME_TYPES.join(", ")} image types`,
    ).optional(),
});
export type CreateSiteInfoIconType = z.infer<typeof CreateSiteInfoIconSchema>;

export const CreateSiteInfoLogoSchema = z.object({
  logo: z
    .file()
    .max(
      unitToBytes(SITE_INFO_IMAGES_CONFIG.LOGO.MAX_FILE_SIZE, "mb"),
      `maximum size is ${SITE_INFO_IMAGES_CONFIG.LOGO.MAX_FILE_SIZE}MB`,
    )
    .mime(SITE_INFO_IMAGES_CONFIG.LOGO.MIME_TYPES, `only accept ${SITE_INFO_IMAGES_CONFIG.LOGO.MIME_TYPES.join(", ")} image types`).optional(),
});
export type CreateSiteInfoLogoType = z.infer<typeof CreateSiteInfoLogoSchema>;

export const CreateSiteInfoOgImageSchema = z.object({
  ogImage: z
    .file()
    .max(
      unitToBytes(SITE_INFO_IMAGES_CONFIG.OG_IMAGE.MAX_FILE_SIZE, "mb"),
      `maximum size is ${SITE_INFO_IMAGES_CONFIG.OG_IMAGE.MAX_FILE_SIZE}MB`,
    )
    .mime(SITE_INFO_IMAGES_CONFIG.OG_IMAGE.MIME_TYPES, `only accept ${SITE_INFO_IMAGES_CONFIG.OG_IMAGE.MIME_TYPES.join(", ")} image types`).optional(),
});
export type CreateSiteInfoOgImageType = z.infer<typeof CreateSiteInfoOgImageSchema>;

export type UpdateSiteInfoType = z.infer<typeof SiteInfoSchema>;
