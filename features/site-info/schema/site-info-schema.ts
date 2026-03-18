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

export type UpdateSiteInfoType = z.infer<typeof SiteInfoSchema>;
