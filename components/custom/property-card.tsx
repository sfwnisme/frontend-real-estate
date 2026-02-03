import Image from "next/image";
import ButtonLink from "./button-link";
import { Property } from "@/types/types";
import { getPropertyImages } from "@/lib/requests";
import { notFound } from "next/navigation";
import { cn } from "@/lib/utils";
import { PAGES_ROUTES } from "@/constants/config";
import { getTranslations } from "next-intl/server";

// type Property = Property;
export default async function PropertyCard({
  property,
}: {
  property: Property;
}) {
  const propertyImages = await getPropertyImages(property._id);
  const tActions = await getTranslations("common.actions");
  const mainImage = propertyImages?.data?.[0];
  if (!propertyImages) {
    notFound();
  }
  return (
    <div className="group relative flex flex-col gap-4 rounded-2xl overflow-hidden w-full">
      <div className={cn("h-[350px]", !mainImage && "bg-gray-100")}>
        {mainImage && (
          <Image
            src={mainImage.url}
            height={mainImage.dimensions.height}
            width={mainImage.dimensions.width}
            alt={property.title}
            className="w-full h-full object-cover grid"
          />
        )}
      </div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 p-4 w-full text-white font-medium backdrop-blur-2xl bg-transparent group-hover:bg-white max-xl:bg-white group-hover:bottom-5 max-xl:bottom-5 group-hover:rounded-2xl max-xl:rounded-2xl group-hover:w-[90%] max-xl:w-[90%] transition-all group-hover:transition-all duration-300 group-hover:duration-300 flex items-center">
        <div className="flex-1">
          <p className="text-sm group-hover:text-gray-500 max-xl:text-gray-500 pb-1">
            {property.title}
          </p>
          <div className="inline-flex gap-2 items-center justify-between w-full">
            <span className="text-xl text-gray-700 font-semibold hidden group-hover:block max-xl:block">
              {Number(property.price).toLocaleString("en-SA", {
                style: "currency",
                currency: "SAR",
              })}
            </span>
            <div className="block xl:hidden group-hover:block text-black">
              <ButtonLink
                href={PAGES_ROUTES.PROPERTIES.PREVIEW + "/" + property.slug}
              >
                {tActions("viewAll")}
              </ButtonLink>
            </div>
          </div>
        </div>
        {/*<div className="block xl:hidden group-hover:block text-black">
          <ButtonLink
            href={PAGES_ROUTES.PROPERTIES.PREVIEW + "/" + property.slug}
          >
            {tActions("viewAll")}
          </ButtonLink>
        </div>*/}
      </div>
    </div>
  );
}
