import PropertyOverviewCard from "@/features/property-page/property-overview-card";
import PropertyCarousel from "@/features/property-page/property-carousel";
import { getProperties, getProperty, getPropertyImages } from "@/lib/requests";
import { notFound } from "next/navigation";
import { type Metadata } from "next";
import YoutubeVideoPlayer from "@/components/custom/youtube-video-player";
import { type OgImageType } from "@/types/types";
import { PAGES_ROUTES } from "@/constants/config";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { returnAlternateLanguages, returnCanonical } from "@/lib/utils";
import { Typography } from "@/components/custom/typography";

export const revalidate = 3600;

const { PREVIEW } = PAGES_ROUTES.PROPERTIES;

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

/**
 * Produce static route parameters for property preview pages by fetching a short list of properties.
 *
 * @returns An array of objects each containing a `slug` property for use as a static route parameter; returns an empty array if no property slugs are available.
 */
export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const properties = await getProperties(10);
  if (!properties.data?.data) {
    return [];
  }

  const propertiesData = properties.data?.data.flatMap((property) => ({
    slug: property.slug,
  }));

  if (!propertiesData || propertiesData.length === 0) return [];
  return propertiesData;
}

/**
 * Builds localized metadata for a property preview page.
 *
 * @param params - A promise resolving to an object with `locale` and `slug` used to determine the request locale and target property
 * @returns A Metadata object containing page title and description, canonical and alternate language URLs, and Open Graph/Twitter metadata (including image data when available). Returns an empty object when the property is not found.
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  setRequestLocale(locale);

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
  const pagePath = PREVIEW + "/" + slug;
  const canonical = returnCanonical(locale, pagePath);


  return {
    title: property.data.title,
    description: property.data.description,
    alternates: {
      canonical,
      languages: returnAlternateLanguages(pagePath),
    },
    openGraph: {
      images: propertyImagesMetadata,
      title: property.data.title,
      description: property.data.description,
      url: canonical,
      type: "article",
    },
    twitter: {
      images: propertyImagesMetadata,
      title: property.data.title,
      description: property.data.description,
      card: "summary_large_image",
    },
  };
}

export default async function Page({ params }: Props) {
  const { slug, locale } = await params;
  // NOTE: do not remove it, it is a double check to ensure SSG is enabled
  setRequestLocale(locale);

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
         locale={locale}
      />
      <PropertyOverviewCard property={propertyData} locale={locale} />
      <article className="flex-1">
        <Typography as="h1" size="3xl" className="mb-10">
          {propertyData.title}
        </Typography>
        <p dangerouslySetInnerHTML={{ __html: propertyData.description }} />
      </article>
      {propertyData.video && (
        <div>
          <YoutubeVideoPlayer link={propertyData?.video} />
        </div>
      )}
    </div>
  );
}
