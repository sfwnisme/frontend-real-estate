"use client";

import useCreateSiteInfoIconDarkFormValidation from "../../hooks/use-create-site-info-icon-dark-form-validation";
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
 * Renders a form UI for uploading, previewing, and deleting the site's dark icon.
 *
 * Displays either an image upload input with validation rules or a preview with delete controls,
 * deriving preview URL and metadata from the provided `data` when no new file is selected or from the chosen file.
 *
 * @param data - Existing image metadata (for example `url`, `size`, `mimeType`, `_id`, `role`, `tag`) used as the current icon when no new file is selected.
 * @returns The JSX element containing the icon upload/preview form.
 */
export default function CreateSiteInfoIconDarkFormView({ data }: Props) {
  const { form, onSubmit, isPending } =
    useCreateSiteInfoIconDarkFormValidation();
  const icon = form.watch("icon");
  const imageUrl = !icon ? data?.url : URL.createObjectURL(icon as File);
  const imageSize = !icon ? data?.size : icon?.size;
  const imageMimeType = !icon ? data?.mimeType : icon?.type;
  const imageRulesDescription = `Types: ${SITE_INFO_IMAGES_CONFIG.ICON.MIME_TYPES.join(", ")}. Maximum file size: ${SITE_INFO_IMAGES_CONFIG.ICON.MAX_FILE_SIZE} MB. Acceptable dimensions: ${SITE_INFO_IMAGES_CONFIG.ICON.DIMENSIONS.map((dimension) => `${dimension.width}x${dimension.height}`).join(", ")}.`;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (!files) {
      e.target.value = "";
      return;
    }
    const file = files[0];
    form.setValue("icon", file, {
      shouldValidate: true,
      shouldDirty: true,
    });

    e.target.value = "";
  };

  const removeImage = async () => {
    form.reset({ icon: undefined });

    if (data?._id) {
      await deleteImage(data?._id, `site-info-${data?.role}-${data?.tag}`);
    }
  };

  return (
    <div>
      <form onChange={onSubmit} className="relative">
        <Typography as="p" size="xs">
          Icon (dark)
        </Typography>
        {!imageUrl && (
          <InputWrapper
            description={imageRulesDescription}
            error={form.formState.errors.icon?.message}
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
              error={form.formState.errors.icon?.message}
              aspectRatio="square"
              hideInfo
            />
          </>
        )}
      </form>
    </div>
  );
}
