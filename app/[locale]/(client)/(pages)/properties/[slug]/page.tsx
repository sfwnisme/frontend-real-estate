import React from "react";

import PropertyOverviewCard from "@/features/propertyPage/propertyOverviewCard";
import PropertyCarousel from "@/features/propertyPage/propertyCarousel";
import { getProperties, getProperty, getPropertyImages } from "@/lib/requests";
import { notFound } from "next/navigation";
import { type Metadata } from "next";
import YoutubeVideoPlayer from "@/components/custom/youtube-video-player";
import { type OgImageType } from "@/types/types";
import { PAGES_ROUTES, SITE_INFO } from "@/constants/config";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const properties = await getProperties();
  if (!properties.data?.data) {
    return [];
  }
  const property = properties.data?.data.map((property) => ({
    slug: property.slug,
  }));
  if (property.length === 0) return [];
  return property;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  try {
    const property = await getProperty(slug);
    if (!property.data) {
      return {
        title: "Property Not Found",
        description: "The requested property could not be found.",
      };
    }
    const propertyData = property.data;

    // Handle images - continue even if images fail (next-intl compatibility)
    let propertyImagesMetadata: OgImageType[] | undefined = undefined;
    try {
      const propertyImages = await getPropertyImages(propertyData._id);
      
      // Check for success (status === 200) and valid data
      if (propertyImages.status === 200 && propertyImages.data && Array.isArray(propertyImages.data) && propertyImages.data.length > 0) {
        propertyImagesMetadata = propertyImages.data
          .filter((image) => image && image.dimensions) // Filter out invalid images
          .map((image) => ({
            url: image.url || "",
            width: image.dimensions?.width || 0,
            height: image.dimensions?.height || 0,
            alt: propertyData.title,
            type: image.mimeType || "image/jpeg",
          }));
        
        // Only set if we have valid images
        if (propertyImagesMetadata.length === 0) {
          propertyImagesMetadata = undefined;
        }
      }
    } catch (error) {
      console.error("Error fetching property images for metadata:", error);
      // Continue without images - don't fail the entire metadata generation
    }

    const canonicalUrl = PAGES_ROUTES.PROPERTIES.PREVIEW + slug;

    return {
      title: propertyData.title,
      description: propertyData.description,
      alternates: {
        canonical: canonicalUrl,
      },
      openGraph: {
        images: propertyImagesMetadata,
        title: propertyData.title,
        description: propertyData.description,
        url: canonicalUrl,
        siteName: SITE_INFO.NAME,
        type: "article",
        countryName: SITE_INFO.COUNTRY,
      },
      twitter: {
        images: propertyImagesMetadata,
        title: propertyData.title,
        description: propertyData.description,
        card: "summary_large_image",
      },
      robots: { index: true, follow: true },
    };
  } catch (error) {
    console.error("Error generating metadata for property:", error);
    // Return fallback metadata instead of empty object (next-intl compatible)
    return {
      title: "Property",
      description: "Property details",
    };
  }
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const property = await getProperty(slug);
  const propertyData = property.data;

  if (!propertyData) {
    notFound();
  }

  return (
    <div className="grid gap-8">
      <PropertyCarousel
        propertyId={propertyData._id}
        propertyAlt={propertyData.title}
      />
      <PropertyOverviewCard property={propertyData} />
      <article className="flex-1">
        <h1 className="text-3xl font-semibold mb-10">{propertyData.title}</h1>
        <p>{propertyData.description}</p>
      </article>
      {propertyData.video && (
        <div>
          <YoutubeVideoPlayer link={propertyData?.video} />
        </div>
      )}
    </div>
  );
}
