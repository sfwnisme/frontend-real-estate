"use client";

import useCreateSiteInfoLogoDarkFormValidation from "../../hooks/use-create-site-info-logo-dark-form-validation";
import ImageInput from "@/components/custom/image-input";
import ImagePreview from "@/components/custom/image-preview";
import InputWrapper from "@/components/custom/input-wrapper";
import { SITE_INFO_IMAGES_CONFIG } from "@/constants/enums";
import { deleteImage } from "@/lib/actions";
import { ImageType } from "@/types/types";

type Props = {
  data: ImageType;
};

export default function CreateSiteInfoLogoDarkFormView({ data }: Props) {
  const { form, onSubmit, isPending } =
    useCreateSiteInfoLogoDarkFormValidation();
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
        <InputWrapper
          title="Logo (dark)"
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
                error={form.formState.errors.logo?.message}
              />
            </>
          )}
        </InputWrapper>
      </form>
    </div>
  );
}
