import Title from "@/components/custom/title";
import { getProperties } from "@/lib/requests";
import type { Metadata } from "next";
import { PAGINATION_CONFIG } from "@/constants/enums";
import type { SearchParamsType } from "@/types/types";
import PropertiesGridView from "@/features/properties/views/properties-grid-veiw";
import PaginationLayout from "@/components/custom/pagination-layout";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import PropertyCardSkeleton from "@/features/properties/skeletons/property-card-skeleton";
import { getTranslations } from "next-intl/server";
import { PAGES_ROUTES } from "@/constants/config";
import { returnAlternateLanguages, returnCanonical } from "@/lib/utils";

const { PREVIEW } = PAGES_ROUTES.PROPERTIES;
const { PAGE } = PAGINATION_CONFIG.PROPERTIES.CLIENT;

export async function generateMetadata({
  searchParams,
  params,
}: {
  searchParams: SearchParamsType;
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const page = (await searchParams)?.page;
  const currentPage = page ? parseInt(page) : 1;
  const properties = await getProperties(PAGE, currentPage);
  if (!properties.data) {
    return {};
  }
  const { nextPage, prevPage } = properties.data;

  const t = await getTranslations("Metadata.properties");
  const title = t("title");
  const description = t("description");
  const ogTitle = t("ogTitle");
  const ogDescription = t("ogDescription");
  const keywords = [title, ogTitle];
  const next = returnCanonical(locale, PREVIEW) + `?page=${nextPage}`;
  const previous = returnCanonical(locale, PREVIEW) + `?page=${prevPage}`;

  return {
    title,
    description,
    alternates: {
      canonical: returnCanonical(locale, PREVIEW),
      languages: returnAlternateLanguages(PREVIEW),
    },
    pagination: {
      next,
      previous,
    },
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      images: [{ url: "/hero-bg.webp" }],
      type: "website", 
      url: returnCanonical(locale, PREVIEW),
    },
    twitter: {
      title: ogTitle,
      description: ogDescription,
      images: [{ url: "/hero-bg.webp" }],
    },
    keywords,
  };
}

export default async function page({
  searchParams,
}: {
  searchParams: SearchParamsType;
}) {
  const t = await getTranslations("PropertiesPage");
  const page = (await searchParams)?.page;
  const currentPage = page ? parseInt(page) : 1;
  const currentPageSize = PAGE;
  const properties = await getProperties(PAGE, currentPage);
  if (!properties.data) {
    notFound();
  }
  const propertiesData = properties.data;

  return (
    <div>
      <Title
        title={t("hero.title")}
        description={t("hero.description")}
        type="start"
        as="h1"
      />
      <div className="h-10" />
      <Suspense fallback={<PropertyCardSkeleton count={currentPageSize} />}>
        <PropertiesGridView
          currentPage={currentPage}
          pageSize={currentPageSize}
        />
      </Suspense>
      <div className="my-12">
        <PaginationLayout
          page={propertiesData.page}
          nextPage={propertiesData.nextPage}
          prevPage={propertiesData.prevPage}
          currentPage={currentPage}
          totalPages={propertiesData.totalPages}
        />
      </div>
    </div>
  );
}
