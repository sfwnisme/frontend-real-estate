import { Suspense } from "react";
import { getProperties } from "@/lib/requests";
import { PAGINATION_CONFIG } from "@/constants/enums";
import PropertyCard from "@/components/custom/property-card";
import PropertyCardSkeleton from "../skeletons/property-card-skeleton";

type Props = {
  pageSize?: number;
  currentPage: number;
};

const RenderProperties = async ({ pageSize, currentPage }: Props) => {
  const properties = await getProperties(pageSize, currentPage);
  if(!properties.data?.data) return null
  const propertiesData = properties.data.data;
  const renderProperties = propertiesData.map((property) => (
    <PropertyCard property={property} key={property._id} />
  ));
  return renderProperties;
};

export default async function PropertiesGridView({
  pageSize,
  currentPage,
}: Props) {
  const currentPageSize = pageSize || PAGINATION_CONFIG.PROPERTIES.CLIENT.PAGE;
  return (
    <div className="responsive">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        <Suspense fallback={<PropertyCardSkeleton count={currentPageSize} />}>
          <RenderProperties
            pageSize={currentPageSize}
            currentPage={currentPage}
          />
        </Suspense>
      </div>
    </div>
  );
}
