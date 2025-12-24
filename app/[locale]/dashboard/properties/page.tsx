import PaginationLayout from "@/components/custom/pagination-layout";
import { Button } from "@/components/ui/button";
import PropertiesTableView from "@/features/properties/views/properties-table-view";
import Link from "next/link";
import { Suspense } from "react";
import { getProperties } from "@/lib/requests";
import PropertiesTableSkeleton from "@/features/properties/skeletons/properties-table-skeleton";
import { PAGINATION_CONFIG } from "@/constants/enums";
import { type Metadata } from "next";
import { type SearchParamsType } from "@/types/types";
import { notFound } from "next/navigation";
import can from "@/features/dashboard/auth/can";
import { Visible } from "@sfwnisme/visi";
import { PAGES_ROUTES } from "@/constants/config";
import { getTranslations } from "next-intl/server";

export const metadata: Metadata = {
  title: "Properties",
  description: "Properties page",
};

const {CREATE} = PAGES_ROUTES.PROPERTIES

export default async function page({
  searchParams,
}: {
  searchParams: SearchParamsType;
}) {
  const t = await getTranslations("resources.property")
  const searchParamsRes = await searchParams;
  const page = searchParamsRes.page;
  const currentPage = page ? parseInt(page) : 1;
  const currentPageSize = PAGINATION_CONFIG.PROPERTIES.DASHBOARD;

  const properties = await getProperties(currentPageSize, currentPage);
  const propertiesData = properties.data;
  if (!propertiesData?.data) {
    notFound();
  }
  const canCreateProperty = await can("property.write");

  return (
    <div>
      <div className="inline-flex justify-between w-full mb-12">
        <h1 className="scroll-m-20 text-center text-4xl font-medium tracking-tight text-balance">
          {t("plural")}
        </h1>
        <Visible when={canCreateProperty}>
          <Button asChild>
            <Link href={CREATE}>{t("create")}</Link>
          </Button>
        </Visible>
      </div>
      <Suspense
        key={currentPage}
        fallback={<PropertiesTableSkeleton count={currentPageSize} />}
      >
        <PropertiesTableView
          currentPage={currentPage}
          searchParams={searchParamsRes}
        />
      </Suspense>
      <PaginationLayout
        page={propertiesData.page}
        nextPage={propertiesData.nextPage}
        prevPage={propertiesData.prevPage}
        currentPage={currentPage}
        totalPages={propertiesData.totalPages}
      />
    </div>
  );
}
