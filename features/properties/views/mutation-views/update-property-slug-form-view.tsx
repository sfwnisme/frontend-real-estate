"use client";

import InputWrapper from "@/components/custom/input-wrapper";
import { Input } from "@/components/ui/input";
import React, { memo } from "react";
import { useLocale, useTranslations } from "next-intl";
import slugify from "slugify";
import useUpdatePropertySlugFormValidation from "../../hooks/use-update-property-slug-form-validation";
import { Property } from "@/types/types";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  ButtonGroup,
  ButtonGroupSeparator,
} from "@/components/ui/button-group";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Props = {
  property: Property;
};
const UpdatePropertySlugFormView = (props: Props) => {
  const locale = useLocale();
  const tActions = useTranslations("common.actions");
  const tSlug = useTranslations("common.slug");
  const { property } = props;
  const { form, onSubmit, isPending } = useUpdatePropertySlugFormValidation(
    property._id,
    property.slug
  );
  const router = useRouter();
  const { isValid, isDirty } = form.formState;
  const canUpdate = isValid || isPending;
  const isDefaultSlug = slugify(property.title, { lower: true }) === property.slug;

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <InputWrapper
        description={
          process.env.NEXT_PUBLIC_FRONTEND_URL +
          "/properties/" +
          slugify(form.getValues("slug"), { lower: true })
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
          onClick={() => form.setValue("slug", property.title)}
          disabled={isDefaultSlug}
          title={
            isDefaultSlug
              ? tSlug("defaultSlug")
              : tSlug("setDefaultSlug")
          }
          aria-label="reset to default slug"
          size="sm"
        >
          {tActions("reset")}
        </Button>
        <Button
          variant="outline"
          type="button"
          onClick={() => router.push(`/properties/${property.slug}`)}
          aria-label="visit property"
          title={tSlug("visitProperty")}
          size="sm"
        >
          {tActions("visit")}
        </Button>
      </ButtonGroup>
    </form>
  );
};

export default memo(UpdatePropertySlugFormView);
