"use client";
import React, { useCallback, useMemo } from "react";
import useCreateBlogPostFormValidation from "../../hooks/use-create-blog-post-form-validaiton";
import FieldSet from "@/components/custom/field-set";
import { Input } from "@/components/ui/input";
import InputWrapper from "@/components/custom/input-wrapper";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BLOG_POST_STATUS } from "@/constants/enums";
import { BlogPostStatus } from "@/types/types";
import { Separator } from "@/components/ui/separator";
import ImageInput from "@/components/custom/image-input";
import ImagePreview from "@/components/custom/image-preview";
import { Button } from "@/components/ui/button";
import LoadingSpinner from "@/components/custom/loading-spinner";
import { useTranslations } from "next-intl";
import RichTextEditor from "@/components/rich-text-editor";
type Props = {};

export default function CreateBlogPostFormView({}: Props) {
  const t = useTranslations("common.form.labels")
  const tSections = useTranslations("common.form.sections")
  const tActions = useTranslations("common.actions")
  const { form, onSubmit, isPending } = useCreateBlogPostFormValidation();
  const image = form.watch("image");
  const imageUrl = image
    ? URL.createObjectURL(form.getValues("image") as File)
    : "";

  const onRichTextEditorChange = useCallback((content: string) => {
    form.setValue("content", content);
    form.trigger("content");
  }, [form.getValues("content")]);
    
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (!files) {
      e.target.value = "";
      return;
    }
    const file = files[0];
    form.setValue("image", file);

    e.target.value = "";
    form.trigger("image");
  };

  const handleDeleteImage = () => {
    form.setValue("image", null);
    form.trigger("image");
  };

  const renderImage = useMemo(() => {
    if (!image) return;
    return (
      <div>
        <ImagePreview
          isFeatured={false}
          imageUrl={imageUrl}
          imageType={image.type}
          imageSize={image.size}
          disableSetFeaturedImage={true}
          deleteImage={handleDeleteImage}
          error={form.formState.errors.image?.message}
        />
      </div>
    );
  }, [imageUrl, form.formState.errors.image?.message, image]);

  return (
    <div>
      <form onSubmit={onSubmit} className="grid lg:grid-cols-5 gap-4">
        <div className="flex flex-col gap-4 min-w-full col-span-full lg:col-span-3">
          <FieldSet title="title" variant="container">
            <InputWrapper
              title={t("title")}
              error={form.formState.errors.title?.message}
            >
              <Input type="text" {...form.register("title")} />
            </InputWrapper>
          </FieldSet>
          <FieldSet title="excerpt" variant="container">
            <InputWrapper
              title={t("excerpt")}
              error={form.formState.errors.excerpt?.message}
            >
              <Input type="text" {...form.register("excerpt")} />
            </InputWrapper>
          </FieldSet>
          <FieldSet title={t("content")} variant="default">
            <RichTextEditor content={form.getValues("content")} onChange={onRichTextEditorChange} />
          </FieldSet>
          <Button
            type="submit"
            disabled={isPending || !form.formState.isValid}
            className="hidden lg:flex"
          >
            {isPending && <LoadingSpinner />}{tActions("create")}
          </Button>
        </div>
        {/* <div className="flex flex-col gap-4 w-full lg:min-w-[300px]"> */}
        <div className="flex flex-col gap-4 lg:col-span-2">
          <FieldSet title={tSections("seoSettings")} childrenClassName="grid gap-4">
            <InputWrapper
              title={t("status")}
              error={form.formState.errors.status?.message}
            >
              <Select
                value={form.getValues("status")}
                onValueChange={(v: BlogPostStatus) =>
                  form.setValue("status", v)
                }
                name="blogPostStatus"
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={t("status")} />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(BLOG_POST_STATUS).map((status) => (
                    <SelectItem value={status} key={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </InputWrapper>
            <Separator />
            <InputWrapper
              title={t("metaTitle")}
              error={form.formState.errors.meta?.title?.message}
            >
              <Input
                type="text"
                {...form.register("meta.title")}
                placeholder={t("metaTitle")}
              />
            </InputWrapper>
            <InputWrapper
              title={t("metaDescription")}
              error={form.formState.errors.meta?.description?.message}
            >
              <Textarea
                className="min-h-[100px]"
                {...form.register("meta.description")}
                placeholder={t("metaDescription")}
              />
            </InputWrapper>
            <InputWrapper
              title={t("metaKeywords")}
              error={form.formState.errors.meta?.keywords?.message}
            >
              <Input
                type="text"
                {...form.register("meta.keywords")}
                placeholder={t("metaKeywords")}
              />
            </InputWrapper>
          </FieldSet>
          <FieldSet title={t("featuredImage")}>
            {image ? (
              renderImage
            ) : (
              <InputWrapper error={form.formState.errors.image?.message}>
                <ImageInput onChange={handleImageChange} />
              </InputWrapper>
            )}
          </FieldSet>
          <Button
            type="submit"
            disabled={isPending || !form.formState.isValid}
            className="w-full lg:hidden"
          >
            {isPending && <LoadingSpinner />}{tActions("create")}
          </Button>
        </div>
      </form>
    </div>
  );
}
