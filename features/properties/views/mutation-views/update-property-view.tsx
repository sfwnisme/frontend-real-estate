"use client";

import { ImageType, Property } from "@/types/types";
import React, { useMemo } from "react";
import { useTranslations } from "next-intl";
import UpdatePropertyFormView from "./update-property-form-view";
import CreateNewPropertyImagesFormView from "./create-new-property-images-form-view";
import FieldSet from "@/components/custom/field-set";
import UpdatePropertySlugFormView from "./update-property-slug-form-view";
import UploadedPropertyImagesView from "@/features/properties/views/mutation-views/uploaded-property-images-view";

type Props = {
  property: Property;
  images: ImageType[] | null;
};

export default function UpdatePropertyView(props: Props) {
  const { property, images } = props;
  const tSections = useTranslations("common.form.sections");
  const tDescs = useTranslations("common.form.descriptions");

  // Stable property reference - only updates when key fields change
  const stableProperty = useMemo(
    () => property, 
    [property._id, property.slug, property.title]
  );
  
  // Stable images reference - detects changes in array length, IDs, or isFeatured status
  const imagesSignature = useMemo(() => {
    if (!images || images.length === 0) return 'empty';
    return images.map(img => `${img._id}:${img.isFeatured}`).join('|');
  }, [images]);
  
  const stableImages = useMemo(() => images, [imagesSignature]);

  return (
    <div className="flex flex-col lg:flex-row gap-4 relative">
      <UpdatePropertyFormView property={stableProperty} />
      <div className="sticky top-0 flex flex-col gap-4 lg:basis-1/3">
        <FieldSet title={tSections("slug")} description={tDescs("slugDescription")}>
          <UpdatePropertySlugFormView property={stableProperty} />
        </FieldSet>
        <FieldSet
          title={tSections("currentImages")}
          description={tDescs("currentImagesDescription")}
        >
          <UploadedPropertyImagesView images={stableImages} />
        </FieldSet>
        <FieldSet
          title={tSections("uploadImages")}
          description={tDescs("uploadImagesDescription")}
        >
          <CreateNewPropertyImagesFormView
            propertyId={property._id}
            disableFeaturedImage
          />
        </FieldSet>
      </div>
    </div>
  );
}
