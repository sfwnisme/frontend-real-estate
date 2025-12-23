"use client";
import React from "react";
import { useTranslations } from "next-intl";
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
import { BlogPost, BlogPostStatus } from "@/types/types";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import LoadingSpinner from "@/components/custom/loading-spinner";
import useUpdateBlogPostFormValidation from "../../hooks/use-update-blog-post-form-validaiton";
type Props = {
  blogPost: BlogPost;
};

export default function UpdateBlogPostFormView(props: Props) {
  const { blogPost } = props;
  const t = useTranslations("common.form.labels");
  const tActions = useTranslations("common.actions");
  const tSections = useTranslations("common.form.sections");
  const tPlaceholders = useTranslations("common.form.placeholders");
  const { form, onSubmit, isPending } =
    useUpdateBlogPostFormValidation(blogPost);
  console.log("trigger:", blogPost);

  const formErrors = form.formState.errors;
  const globalError = form.formState.errors.root?.message;

  return (
    <div>
      <form
        onSubmit={onSubmit}
        className="grid grid-cols-1 gap-4"
      >
        <div className="flex flex-col gap-4 w-full">
          <FieldSet title={t("title")} variant="container">
            <InputWrapper
              title={t("title")}
              error={form.formState.errors.title?.message}
            >
              <Input type="text" {...form.register("title")} />
            </InputWrapper>
          </FieldSet>
          <FieldSet title={t("excerpt")} variant="container">
            <InputWrapper
              title={t("excerpt")}
              error={form.formState.errors.excerpt?.message}
            >
              <Input type="text" {...form.register("excerpt")} />
            </InputWrapper>
          </FieldSet>
          <FieldSet title={t("content")} variant="container">
            <InputWrapper
              title={t("content")}
              error={form.formState.errors.content?.message}
            >
              <Textarea
                className="min-h-[200px] wrap-break-word"
                {...form.register("content")}
              />
            </InputWrapper>
          </FieldSet>
        </div>
        <div className="flex flex-col gap-4 w-full">
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
                  <SelectValue placeholder={tPlaceholders("status")} />
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
                placeholder={tPlaceholders("metaTitle")}
              />
            </InputWrapper>
            <InputWrapper
              title={t("metaDescription")}
              error={form.formState.errors.meta?.description?.message}
            >
              <Textarea
                className="min-h-[100px]"
                {...form.register("meta.description")}
                placeholder={tPlaceholders("metaDescription")}
              />
            </InputWrapper>
            <InputWrapper
              title={t("metaKeywords")}
              error={form.formState.errors.meta?.keywords?.message}
            >
              <Input
                type="text"
                {...form.register("meta.keywords")}
                placeholder={tPlaceholders("metaKeywords")}
              />
            </InputWrapper>
          </FieldSet>
        </div>
        <Button
          type="submit"
          disabled={isPending || !form.formState.isValid}
          className=""
        >
          {isPending && <LoadingSpinner />}{tActions("updateBlogPostDetails")}
        </Button>
      </form>
    </div>
  );
}
