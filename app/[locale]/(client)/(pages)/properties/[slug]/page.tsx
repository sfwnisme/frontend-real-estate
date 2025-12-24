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

  const property = await getProperty(slug);
  if (!property.data) {
    return {};
  }
  const propertyData = property.data;
  const propertyImages = await getPropertyImages(property.data._id);
  const propertyImagesData = propertyImages.data;

  const propertyImagesMetadata: OgImageType[] | undefined =
    propertyImagesData?.map((image) => ({
      url: image.url,
      width: image.dimensions.width,
      height: image.dimensions.height,
      alt: propertyData.title,
      type: image.mimeType,
    }));
  const canonicalUrl = PAGES_ROUTES.PROPERTIES.PREVIEW + slug;

  return {
    title: property.data.title,
    description: property.data.description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      images: propertyImagesMetadata,
      title: property.data.title,
      description: property.data.description,
      url: canonicalUrl,
      siteName: SITE_INFO.NAME,
      type: "article",
      countryName: SITE_INFO.COUNTRY,
    },
    twitter: {
      images: propertyImagesMetadata,
      title: property.data.title,
      description: property.data.description,
      card: "summary_large_image",
    },
    robots: { index: true, follow: true },
  };
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
