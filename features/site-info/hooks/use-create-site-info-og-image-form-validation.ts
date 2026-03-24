"use client";

import { useTransition } from "react";
import {
  CreateSiteInfoOgImageSchema,
  CreateSiteInfoOgImageType,
} from "../schema/site-info-schema";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { createSiteInfoOgImage } from "../lib/actions";
import { STATUS_TEXT } from "@/constants/enums";

/**
 * Wires up validation and submission for the "create site info OG image" form.
 *
 * @returns An object containing:
 * - `form`: the react-hook-form instance configured with the `CreateSiteInfoOgImageSchema` resolver and `onChange` validation mode.
 * - `onSubmit`: a submit handler (already wrapped with `form.handleSubmit`) that validates presence of `ogImage`, shows toast errors for missing or failed requests, and invokes the create API when valid.
 * - `isPending`: a boolean indicating whether the create transition is in progress.
 */
export default function useCreateSiteInfoOgImageFormValidation() {
  const [isPending, startCreate] = useTransition();
  const form = useForm<CreateSiteInfoOgImageType>({
    resolver: zodResolver(CreateSiteInfoOgImageSchema),
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<CreateSiteInfoOgImageType> = (value) => {
    const ogImage = value?.ogImage;
    if (!ogImage) {
      toast.error("Please select an og image");
      return;
    }
    startCreate(async () => {
      try {
        const createdSiteInfoOgImageRes = await createSiteInfoOgImage(ogImage);
        if (createdSiteInfoOgImageRes.statusText !== STATUS_TEXT.SUCCESS) {
          toast.error(
            typeof createdSiteInfoOgImageRes.msg === "string"
              ? createdSiteInfoOgImageRes.msg
              : createdSiteInfoOgImageRes.msg?.[0].field ||
                  createdSiteInfoOgImageRes,
          );
        } else {
          toast.success(createdSiteInfoOgImageRes.msg);
        }
      } catch (error) {
        toast.error("Error creating site info og image");
        console.error("Error creating site info og image:", error);
      }
    });
  };

  const returnedValues = {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    isPending,
  };

  return returnedValues;
}
