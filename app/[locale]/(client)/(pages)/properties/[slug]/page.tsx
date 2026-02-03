import PropertyOverviewCard from "@/features/propertyPage/property-overview-card";
import PropertyCarousel from "@/features/propertyPage/property-carousel";
import { getProperties, getProperty, getPropertyImages } from "@/lib/requests";
import { notFound } from "next/navigation";
import { type Metadata } from "next";
import YoutubeVideoPlayer from "@/components/custom/youtube-video-player";
import { type OgImageType } from "@/types/types";
import { PAGES_ROUTES } from "@/constants/config";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { returnAlternateLanguages, returnCanonical } from "@/lib/utils";
import { Typography } from "@/components/custom/typography";

export const dynamic = "force-static";
export const revalidate = 3600;

const { PREVIEW } = PAGES_ROUTES.PROPERTIES;

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const properties = await getProperties(1000);
  if (!properties.data?.data) {
    return [];
  }

  const propertiesData = properties.data?.data.flatMap((property) => ({
    slug: property.slug,
  }));

  if (!propertiesData || propertiesData.length === 0) return [];
  return propertiesData;
}

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

  const t = await getTranslations("SiteConfig");
  const SITE_NAME = t("name");
  const SITE_COUNTRY = t("country");

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
      siteName: SITE_NAME,
      countryName: SITE_COUNTRY,
      type: "article",
      authors: SITE_NAME,
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
        <Typography as="h1" variant="h2" className="mb-10">
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
