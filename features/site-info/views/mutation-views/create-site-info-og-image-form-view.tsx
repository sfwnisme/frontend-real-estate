"use client";

import useCreateSiteInfoOgImageFormValidation from "../../hooks/use-create-site-info-og-image-form-validation";
import ImageInput from "@/components/custom/image-input";
import ImagePreview from "@/components/custom/image-preview";
import InputWrapper from "@/components/custom/input-wrapper";
import { Typography } from "@/components/custom/typography";
import { SITE_INFO_IMAGES_CONFIG } from "@/constants/enums";
import { deleteImage } from "@/lib/actions";
import { ImageType } from "@/types/types";

type Props = {
  data: ImageType;
};

/**
 * Renders a form to upload, preview, validate, and optionally delete the OG image for the given site-info image data.
 *
 * The component displays an upload input with rules and validation when no preview is available, or an image preview with delete controls when an image URL is present. Removing the image resets the form field and, if the provided `data` contains an `_id`, deletes the existing stored image.
 *
 * @param data - Initial image metadata used as the fallback preview and for delete operations (`url`, `size`, `mimeType`, and optional `_id`, `role`, `tag`).
 * @returns The JSX element for the OG image form view.
 */
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
        <Typography as="p" size="xs">
          OG image
        </Typography>
        {!imageUrl && (
          <InputWrapper
            description={imageRulesDescription}
            error={form.formState.errors.ogImage?.message}
          >
            <ImageInput onChange={handleImageChange} />
          </InputWrapper>
        )}
        {imageUrl && (
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
              aspectRatio="auto"
              hideInfo
            />
          </>
        )}
      </form>
    </div>
  );
}
