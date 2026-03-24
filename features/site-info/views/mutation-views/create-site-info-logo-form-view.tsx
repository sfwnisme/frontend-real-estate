"use client";

import useCreateSiteInfoLogoFormValidation from "../../hooks/use-create-site-info-logo-form-validation";
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
 * Render a logo upload form with preview, validation, and remove functionality for site info.
 *
 * Uses the form returned by `useCreateSiteInfoLogoFormValidation()` to manage a `logo` field,
 * displays an upload input when no image is present, and displays a preview with delete controls
 * when an existing or newly selected image is available. The preview URL, size, and MIME type
 * are derived from the selected File when present or from the provided `data` otherwise.
 *
 * @param data - Optional existing image metadata used as the initial preview. Expected fields: `url`, `size`, `mimeType`, `_id`, `role`, and `tag`.
 * @returns The JSX element rendering the logo upload form and image preview controls.
 */
export default function CreateSiteInfoLogoFormView({ data }: Props) {
  const { form, onSubmit, isPending } = useCreateSiteInfoLogoFormValidation();
  const logo = form.watch("logo");
  const imageUrl = !logo ? data?.url : URL.createObjectURL(logo as File);
  const imageSize = !logo ? data?.size : logo?.size;
  const imageMimeType = !logo ? data?.mimeType : logo?.type;
  const imageRulesDescription = `Types: ${SITE_INFO_IMAGES_CONFIG.LOGO.MIME_TYPES.join(", ")}. Maximum file size: ${SITE_INFO_IMAGES_CONFIG.LOGO.MAX_FILE_SIZE} MB. Dimensions between ${SITE_INFO_IMAGES_CONFIG.LOGO.MIN_WIDTH}x${SITE_INFO_IMAGES_CONFIG.LOGO.MIN_HEIGHT} and ${SITE_INFO_IMAGES_CONFIG.LOGO.MAX_WIDTH}x${SITE_INFO_IMAGES_CONFIG.LOGO.MAX_HEIGHT}.`;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (!files) {
      e.target.value = "";
      return;
    }
    const file = files[0];
    form.setValue("logo", file, {
      shouldValidate: true,
      shouldDirty: true,
    });

    e.target.value = "";
  };

  const removeImage = async () => {
    form.reset({ logo: undefined });

    if (data?._id) {
      await deleteImage(data?._id, `site-info-${data?.role}-${data?.tag}`);
    }
  };

  return (
    <div>
      <form onChange={onSubmit} className="relative">
        <Typography as="p" size="xs">
          Logo
        </Typography>
        {!imageUrl && (
          <InputWrapper
            description={imageRulesDescription}
            error={form.formState.errors.logo?.message}
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
              error={form.formState.errors.logo?.message}
              aspectRatio="square"
              hideInfo
            />
          </>
        )}
      </form>
    </div>
  );
}
