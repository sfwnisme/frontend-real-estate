import { Suspense } from "react";
import { PAGINATION_CONFIG } from "@/constants/enums";
import Title from "@/components/custom/title";
import PropertiesGridView from "./properties-grid-veiw";
import PropertyCardSkeleton from "../skeletons/property-card-skeleton";
import { getTranslations } from "next-intl/server";

type Props = {
  pageSize?: number;
  currentPage?: number;
};

export default async function PropertiesHomePageView({
  pageSize = PAGINATION_CONFIG.BLOG.CLIENT.OVERVIEW,
  currentPage = 1,
}: Props) {
  const t = await getTranslations("HomePage.PropertiesSection");
  return (
    <div>
      <Title
        type="center"
        title={t("title")}
        description={t("description")}
      />
      <div className="h-16" />
      <Suspense fallback={<PropertyCardSkeleton count={pageSize} />}>
        <PropertiesGridView pageSize={pageSize} currentPage={currentPage} />
      </Suspense>
    </div>
  );
}
