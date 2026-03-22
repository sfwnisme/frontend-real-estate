"use client";

import useCreateSiteInfoOgImageFormValidation from "../../hooks/use-create-site-info-og-image-form-validation";
import ImageInput from "@/components/custom/image-input";
import ImagePreview from "@/components/custom/image-preview";
import InputWrapper from "@/components/custom/input-wrapper";
import { SITE_INFO_IMAGES_CONFIG } from "@/constants/enums";
import { deleteImage } from "@/lib/actions";
import { ImageType } from "@/types/types";

type Props = {
  data: ImageType;
};

export default function CreateSiteInfoOgImageFormView({ data }: Props) {
  const { form, onSubmit, isPending } =
    useCreateSiteInfoOgImageFormValidation();
  const ogImage = form.watch("ogImage");
  const imageUrl = !ogImage ? data?.url : URL.createObjectURL(ogImage as File);
  const imageSize = !ogImage ? data?.size : ogImage?.size;
  const imageMimeType = !ogImage ? data?.mimeType : ogImage?.type;
  const imageRulesDescription = `Types: ${SITE_INFO_IMAGES_CONFIG.OG_IMAGE.MIME_TYPES.join(", ")}. Maximum file size: ${SITE_INFO_IMAGES_CONFIG.OG_IMAGE.MAX_FILE_SIZE} MB. Recommended dimensions: ${SITE_INFO_IMAGES_CONFIG.OG_IMAGE.RECOMMENDED_WIDTH}x${SITE_INFO_IMAGES_CONFIG.OG_IMAGE.RECOMMENDED_HEIGHT}.`;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (!files) {
      e.target.value = "";
      return;
    }
    const file = files[0];
    form.setValue("ogImage", file, {
      shouldValidate: true,
      shouldDirty: true,
    });

    e.target.value = "";
  };

  const removeImage = async () => {
    form.reset({ ogImage: undefined });

    if (data?._id) {
      await deleteImage(data?._id, `site-info-${data?.role}-${data?.tag}`);
    }
  };

  return (
    <div>
      <form onChange={onSubmit} className="relative">
        <InputWrapper
          title="OG image"
          description={!imageUrl ? imageRulesDescription : ""}
        >
          {!imageUrl ? (
            <ImageInput onChange={handleImageChange} />
          ) : (
            <>
              <ImagePreview
                isLoading={isPending}
                disableSetFeaturedImage
                deleteImage={removeImage}
                disableDeleteImage={isPending}
                imageUrl={imageUrl}
                imageSize={imageSize || 0}
                imageType={imageMimeType || ""}
                error={form.formState.errors.ogImage?.message}
              />
            </>
          )}
        </InputWrapper>
      </form>
    </div>
  );
}
