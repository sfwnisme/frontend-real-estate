"use client";

import { useTransition } from "react";
import {
  CreateSiteInfoLogoSchema,
  CreateSiteInfoLogoType,
} from "../schema/site-info-schema";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { createSiteInfoLogoDark } from "../lib/actions";
import { STATUS_TEXT } from "@/constants/enums";

/**
 * Set up validation and submission handling for the "site info logo dark" creation form.
 *
 * Initializes a react-hook-form instance validated by `CreateSiteInfoLogoSchema` and provides a submit
 * handler that uploads the selected logo and displays success or error toasts.
 *
 * @returns An object containing:
 * - `form` — the configured `useForm` instance for the create form
 * - `onSubmit` — a submit callback wired to `form.handleSubmit` that validates input and triggers creation
 * - `isPending` — a boolean indicating whether the create transition is in progress
 */
export default function useCreateSiteInfoLogoDarkFormValidation() {
  const [isPending, startCreate] = useTransition();
  const form = useForm<CreateSiteInfoLogoType>({
    resolver: zodResolver(CreateSiteInfoLogoSchema),
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<CreateSiteInfoLogoType> = (value) => {
    const logo = value?.logo;
    if (!logo) {
      toast.error("Please select a logo");
      return;
    }
    startCreate(async () => {
      try {
        const createdSiteInfoLogoDarkRes = await createSiteInfoLogoDark(logo);
        if (createdSiteInfoLogoDarkRes.statusText !== STATUS_TEXT.SUCCESS) {
          toast.error(
            typeof createdSiteInfoLogoDarkRes.msg === "string"
              ? createdSiteInfoLogoDarkRes.msg
              : createdSiteInfoLogoDarkRes.msg?.[0].field || createdSiteInfoLogoDarkRes,
          );
        } else {
          toast.success(createdSiteInfoLogoDarkRes.msg);
        }
      } catch (error) {
        toast.error("Error creating site info logo dark");
        console.error("Error creating site info logo dark:", error);
      }
    });
  };

  const returnedValues = {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    isPending,
  }

  return returnedValues;
}
