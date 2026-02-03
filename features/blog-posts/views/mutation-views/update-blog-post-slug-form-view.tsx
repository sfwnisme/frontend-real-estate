"use client";

import InputWrapper from "@/components/custom/input-wrapper";
import { Input } from "@/components/ui/input";
import React, { memo } from "react";
import { useLocale, useTranslations } from "next-intl";
import useUpdateBlogPostSlugFormValidation from "../../hooks/use-update-blog-post-slug-form-validaiton";
import { BlogPost, Property } from "@/types/types";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  ButtonGroup,
  ButtonGroupSeparator,
} from "@/components/ui/button-group";
import Link from "next/link";
import { useRouter } from "next/navigation";
import FieldSet from "@/components/custom/field-set";
import { returnSlug } from "@/lib/utils";

type Props = {
  blogPost: BlogPost;
};
const UpdateBlogPostSlugFormView = (props: Props) => {
  const { blogPost } = props;
  const locale = useLocale();
  const tActions = useTranslations("common.actions");
  const tSlug = useTranslations("common.slug");
  const tSections = useTranslations("common.form.sections");
  const tDescs = useTranslations("common.form.descriptions");
  const { form, onSubmit, isPending } = useUpdateBlogPostSlugFormValidation(
    blogPost._id,
    blogPost.slug
  );
  const router = useRouter();
  const { isValid, isDirty } = form.formState;
  const canUpdate = isValid || isPending;  
  const isDefaultSlug = returnSlug(blogPost.title) === blogPost.slug;

  return (
    <FieldSet title={tSections("slug")} description={tDescs("slugDescriptionBlogPost")} childrenClassName="grid gap-4">
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <InputWrapper
        description={
          process.env.NEXT_PUBLIC_FRONTEND_URL +
          "/blog-posts/" +
          returnSlug(form.getValues("slug"))
        }
        error={form.formState.errors.slug?.message}
        childrenClassName="flex flex-row"
      >
        <Input type="text" {...form.register("slug")} />
      </InputWrapper>
      <ButtonGroup orientation={locale === "en" ? "horizontal" : "horizontalAr"}>
        <Button type="submit" disabled={!canUpdate} size="sm">
          {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
          {tActions("update")}
        </Button>
        <ButtonGroupSeparator />
        <Button
          type="button"
          variant="outline"
          onClick={() => form.setValue("slug", blogPost.title)}
          disabled={isDefaultSlug}
          title={
            isDefaultSlug
              ? tSlug("defaultSlug")
              : tSlug("setDefaultSlugBlogPost")
          }
          aria-label="reset to default slug"
          size="sm"
        >
          {tActions("reset")}
        </Button>
        <Button
          variant="outline"
          type="button"
          onClick={() => router.push(`/blog-posts/${blogPost.slug}`)}
          aria-label="visit blog post"
          title={tSlug("visitBlogPost")}
          size="sm"
        >
          {tActions("visit")}
        </Button>
      </ButtonGroup>
    </form>
    </FieldSet>
  );
};

export default memo(UpdateBlogPostSlugFormView);
