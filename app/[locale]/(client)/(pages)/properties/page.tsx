import Title from "@/components/custom/title";
import { getProperties } from "@/lib/requests";
import type { Metadata } from "next";
import { PAGINATION_CONFIG } from "@/constants/enums";
import { SITE_INFO } from "@/constants/config";
import type { SearchParamsType } from "@/types/types";
import PropertiesGridView from "@/features/properties/views/properties-grid-veiw";
import PaginationLayout from "@/components/custom/pagination-layout";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import PropertyCardSkeleton from "@/features/properties/skeletons/property-card-skeleton";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: SearchParamsType;
}): Promise<Metadata> {
  const page = (await searchParams)?.page;
  const currentPage = page ? parseInt(page) : 1;
  const properties = await getProperties(
    PAGINATION_CONFIG.PROPERTIES.CLIENT.PAGE,
    currentPage
  );

  if (!properties.data) {
    return {};
  }

  const { nextPage, prevPage } = properties.data;
  const { TITLE, DESCRIPTION, ROUTE } = SITE_INFO.PAGES.PROPERTIES;

  return {
    title: TITLE,
    description: DESCRIPTION,
    alternates: {
      canonical: ROUTE,
    },
    pagination: {
      next: ROUTE + `?page=${nextPage}`,
      previous: ROUTE + `?page=${prevPage}`,
    },
  };
}

export default async function page({
  searchParams,
}: {
  searchParams: SearchParamsType;
}) {
  const page = (await searchParams)?.page;
  const currentPage = page ? parseInt(page) : 1;
  const currentPageSize = PAGINATION_CONFIG.PROPERTIES.CLIENT.PAGE;
  const properties = await getProperties(
    PAGINATION_CONFIG.PROPERTIES.CLIENT.PAGE,
    currentPage
  );
  if (!properties.data) {
    notFound();
  }
  const propertiesData = properties.data;
  return (
    <div>
      <Title
        title="Find Your Dream Home"
        description="Discover a curated selection of properties designed to suit every lifestyle, from cozy family homes to luxurious retreats."
        type="start"
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
