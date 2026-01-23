import { Typography } from "@/components/custom/typography";
import { currency } from "@/lib/utils";
import { Property } from "@/types/types";
import { BedSingle, Building2, Calendar, Car, Ruler } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

type Props = {
  property: Pick<
    Property,
    | "price"
    | "propertyType"
    | "bedrooms"
    | "garage"
    | "propertySize"
    | "yearBuilt"
  >;
  locale: string;
};

export default function PropertyOverviewCard({ property, locale }: Props) {
  const { price, propertyType, bedrooms, garage, propertySize, yearBuilt } =
    property;
  const t = useTranslations("common.form.labels");
  const tPropertyTypes = useTranslations("common.propertyTypes");
  const tUnits = useTranslations("common.units");

  return (
    <div className="border border-gray-300 rounded-2xl p-4 sm:p-6 w-full flex max-sm:flex-col items-center gap-8">
      <Typography as="h2" variant="h2" className="sm:border-r sm:border-r-gray-200 pr-6">
        {currency(price, locale)}
      </Typography>
      <ul className="flex flex-wrap gap-3 sm:gap-x-4 sm:gap-y-4 xl:gap-x-8 lg:gap-y-4 w-full flex-1 max-sm:justify-center lg:justify-between">
        <li className="text-gray-700 text-base sm:text-base lg:text-lg font-medium inline-flex items-center gap-2">
          <BedSingle size={20} strokeWidth={1.4} />
          {bedrooms} {t("bedrooms")}
        </li>
        <li className="text-gray-700 text-base sm:text-base lg:text-lg font-medium inline-flex items-center gap-2">
          <Car size={20} strokeWidth={1.4} />
          {garage} {t("garage")}
        </li>
        <li className="text-gray-700 text-base sm:text-base lg:text-lg font-medium inline-flex items-center gap-2">
          <Ruler size={20} strokeWidth={1.4} />
          {propertySize} {tUnits("squareMeter")}
        </li>
        <li className="text-gray-700 text-base sm:text-base lg:text-lg font-medium inline-flex items-center gap-2">
          <Calendar size={20} strokeWidth={1.4} />
          {yearBuilt}
        </li>
        <li className="text-gray-700 text-base sm:text-base lg:text-lg font-medium inline-flex items-center gap-2">
          <Building2 size={20} strokeWidth={1.4} />
          {tPropertyTypes(propertyType)}
        </li>
      </ul>
    </div>
  );
}
