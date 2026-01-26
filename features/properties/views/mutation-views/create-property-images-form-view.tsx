import React, { useCallback, useMemo } from "react";
import ImageInput from "@/components/custom/image-input";
import { FieldArrayPath, UseFormReturn, useFieldArray } from "react-hook-form";
import { CreatePropertyWithImagesType } from "../../schema/create-property-with-images-schema";
import InputWrapper from "@/components/custom/input-wrapper";
import ImagePreview from "@/components/custom/image-preview";

type Props = {
  form: UseFormReturn<CreatePropertyWithImagesType>;
};

const CreatePropertyImagesFormView = (props: Props) => {
  console.log("UPLOAD IMAGE COMPONENT FIRED");
  const { form } = props;
  const fieldArray = useFieldArray({
    name: "images" as FieldArrayPath<
      Pick<CreatePropertyWithImagesType, "images">
    >,
    control: form.control,
  });

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
    [fieldArray /*, form*/]
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
    [fieldArray /*, form*/]
  );

  const renderUploadImages = useMemo(() => {
    return (
      <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-2 max-h-[400px] overflow-y-auto">
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
                deleteImage={() => removeImage(idx)}
                disableSetFeaturedImage={isDisabled}
                setFeaturedImage={() => handleSetFeaturedImage(idx)}
                error={imageError}
                key={`image-preview-${
                  image?.image.lastModified +
                  image?.image.name +
                  image?.image.size
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
    <div>
      <InputWrapper error={globalImagesError}>
        <ImageInput
          onChange={(e) => handleImageChange(e)}
          multiple
          className="h-full"
        />
      </InputWrapper>
      {fieldArray.fields.length > 0 && (
        <div className="col-span-full mt-4">{renderUploadImages}</div>
      )}
    </div>
  );
};

export default CreatePropertyImagesFormView;
