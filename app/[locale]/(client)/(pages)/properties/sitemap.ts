import type { MetadataRoute } from "next";
import { getProperties } from "@/lib/requests";

const BASE_URL = process.env.NEXT_PUBLIC_FRONTEND_URL;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const properties = await getProperties(300); // Fetch all properties

  if (!properties.data?.data) {
    return [];
  }

  return properties.data.data.map((property) => ({
    url: `${BASE_URL}/properties/${property.slug}`,
    lastModified: property.updatedAt,
    changeFrequency: "daily",
    published: property.createdAt,
    priority: 0.7,
  }));
}
