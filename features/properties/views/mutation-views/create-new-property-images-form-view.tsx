"use client";
import React, { useCallback, useMemo, memo } from "react";
import { useTranslations } from "next-intl";
import ImageInput from "@/components/custom/image-input";
import { Button } from "@/components/ui/button";
import InputWrapper from "@/components/custom/input-wrapper";
import useCreateImagesFormValidation from "../../hooks/use-create-property-images-form-validation";
import ImagePreview from "@/components/custom/image-preview";

type Props = {
  propertyId: string;
  disableFeaturedImage?: boolean;
};
const CreateNewPropertyImagesFormView = ({
  propertyId,
  disableFeaturedImage = false,
}: Props) => {
  const tActions = useTranslations("common.actions");
  const { form, onSubmit, isUploading, fieldArray } =
    useCreateImagesFormValidation(propertyId);
  const { errors } = form.formState;
  const globalImagesError = errors.images?.message;
  const imagesFieldErrors = errors.images;

  const handleImageChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || []) as File[];
      if (files.length === 0) {
        e.target.value = "";
        return;
      }
      files.forEach((file) =>
        fieldArray.append({ image: file, isFeatured: false })
      );
      e.target.value = "";
      form.trigger("images");
    },
    [fieldArray, form]
  );

  const removeImage = useCallback(
    (idx: number) => {
      fieldArray.remove(idx);
    },
    [fieldArray]
  );
  const handleSetFeaturedImage = useCallback(
    (idx: number) => {
      fieldArray.fields.forEach((field, fieldIndex) => {
        fieldArray.update(fieldIndex, {
          ...form.getValues(`images.${fieldIndex}`),
          isFeatured: false,
        });
      });
      fieldArray.update(idx, {
        ...form.getValues(`images.${idx}`),
        isFeatured: true,
      });
    },
    [fieldArray, form]
  );

  const renderUploadImages = useMemo(() => {
    return (
      <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-2 max-h-[400px] overflow-y-scroll">
        {fieldArray.fields.length !== 0 &&
          fieldArray.fields.map((item, idx) => {
            const imageError =
              (Array.isArray(imagesFieldErrors) &&
                imagesFieldErrors[idx]?.image?.message) ||
              undefined;

            const image = form.getValues(`images.${idx}`);

            const isFeatured = fieldArray.fields?.[idx]?.isFeatured;
            const isGlobalError = !!globalImagesError;
            const isImageError = !!imageError;
            const isDisabled = isGlobalError || isImageError;

            return (
              <ImagePreview
                imageSize={image?.image.size}
                imageType={image?.image.type}
                imageUrl={URL.createObjectURL(image?.image)}
                isFeatured={isFeatured}
                disableSetFeaturedImage={disableFeaturedImage || isDisabled}
                deleteImage={() => removeImage(idx)}
                setFeaturedImage={() => handleSetFeaturedImage(idx)}
                error={imageError}
                key={`image-preview-${
                  item.image.lastModified + item.image.name + item.image.size
                }`}
              />
            );
          })}
      </div>
    );
  }, [
    fieldArray.fields,
    imagesFieldErrors,
    handleSetFeaturedImage,
    removeImage,
    form,
  ]);

  return (
    <div className="flex flex-col gap-2">
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <InputWrapper error={globalImagesError}>
          <ImageInput
            onChange={(e) => handleImageChange(e)}
            accept="image/*"
            multiple
            className="h-full"
            />
        </InputWrapper>
        {fieldArray.fields.length > 0 && <div>{renderUploadImages}</div>}
        <Button
          type="submit"
          disabled={
            isUploading ||
            fieldArray.fields.length === 0 ||
            !form.formState.isValid
          }
          className="w-full"
        >
          {tActions("uploadImages")}
        </Button>
      </form>
    </div>
  );
};

export default memo(CreateNewPropertyImagesFormView);
