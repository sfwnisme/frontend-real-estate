import UpdatePropertyView from "@/features/properties/views/mutation-views/update-property-view";
import { getProperty, getPropertyImages } from "@/lib/requests";
import { SlugParamsType } from "@/types/types";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Typography } from "@/components/custom/typography";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("resources.property")
  return {
    title: t("update"),
  }
}

type Props = {
  params: SlugParamsType;
}

export default async function page(props: Props) {
  const params = await props.params;
  const { slug } = params;
  const t = await getTranslations("common.messages");
  const property = await getProperty(slug);
  if (!property.data) {
    notFound();
  }
  const propertyImages = await getPropertyImages(property.data._id);

  return (
    <div className="flex flex-col gap-4">
      <Typography as="h1" variant="h4">
        {t("editing")}: {property.data.title}
      </Typography>
      <UpdatePropertyView
        property={property.data}
        images={propertyImages.data}
      />
    </div>
  );
}
