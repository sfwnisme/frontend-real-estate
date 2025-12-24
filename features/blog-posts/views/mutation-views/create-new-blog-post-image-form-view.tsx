"use client";
import React, { useCallback, useMemo, memo } from "react";
import { useTranslations } from "next-intl";
import ImageInput from "@/components/custom/image-input";
import { Button } from "@/components/ui/button";
import InputWrapper from "@/components/custom/input-wrapper";
import ImagePreview from "@/components/custom/image-preview";
import useCreateBlogPostImageFormValidation from "../../hooks/use-create-blog-post-image-form-validation";
import { ImageType } from "@/types/types";
import FieldSet from "@/components/custom/field-set";
import LoadingSpinner from "@/components/custom/loading-spinner";
import { deleteImage } from "@/lib/requests";
import { Case, Shift } from "@sfwnisme/visi";
import { toast } from "sonner";

type Props = {
  blogPostId: string;
  image: ImageType | null;
};
const CreateNewBlogPostImageFormView = ({ blogPostId, image }: Props) => {
  const tSections = useTranslations("common.form.sections");
  const tToast = useTranslations("common.toast");
  const tMessages = useTranslations("common.messages");
  const { form, onSubmit, isUploading } =
    useCreateBlogPostImageFormValidation(blogPostId);
  const { errors } = form.formState;
  const globalImageError = errors.image?.message;
  const imageFieldErrors = errors.image;
  const formImage = form.getValues("image")
  console.log("image api", image)

  console.log("image form form errors", form.formState.errors.image);
  console.log("image form form values", form.getValues("image"));
  const handleImageChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      form.setValue("image", e.target.files?.[0] as File);
      onSubmit();
    },
    [form, image]
  );

  const removeImage = useCallback(async () => {
    toast.promise(deleteImage(image?._id!, blogPostId), {
      loading: tToast("deletingImage"),
      success: tToast("imageDeleted"),
      error: tToast("failedToDeleteImage"),
    });
  }, [form]);

  // works if image not accepted by the api
  const removeNewImage = useCallback(async () => {
    form.reset();
  }, [form]);

  const renderNewImage = useMemo(() => {
    return (
      <ImagePreview
        imageSize={formImage?.size}
        imageType={formImage?.type}
        imageUrl={formImage ? URL.createObjectURL(formImage as File) : ""}
        disableSetFeaturedImage={true}
        deleteImage={removeNewImage}
        setFeaturedImage={() => {}}
        error={imageFieldErrors?.message}
        key={`image-preview-${formImage?.name}`}
      />
    );
  }, [formImage, imageFieldErrors?.message]);

  const renderImageForm = useMemo(
    () => (
      <form onSubmit={onSubmit}>
        <InputWrapper error={globalImageError} disableError>
          <ImageInput onChange={handleImageChange} />
        </InputWrapper>
      </form>
    ),
    []
  );

  const renderUploadedImage = useMemo(() => {
    return (
      <ImagePreview
        imageSize={image?.size!}
        imageType={image?.mimeType!}
        imageUrl={image?.url!}
        disableSetFeaturedImage={true}
        deleteImage={removeImage}
        setFeaturedImage={() => {}}
        error={imageFieldErrors?.message}
        key={`image-preview-${image?._id!}`}
      />
    );
  }, [image]);

  return (
    <FieldSet title={tSections("uploadImage")}>
      <Shift fallback={<div>{tMessages("loading")}</div>}>
        <Case when={!image && !formImage}>{renderImageForm}</Case>
        <Case when={!image && formImage}>{renderNewImage}</Case>
        <Case when={image && !formImage}>{renderUploadedImage}</Case>
      </Shift>
    </FieldSet>
  );
};

export default memo(CreateNewBlogPostImageFormView);
