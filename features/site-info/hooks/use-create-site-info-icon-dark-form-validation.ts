"use client";

import { useTransition } from "react";
import {
  CreateSiteInfoIconSchema,
  CreateSiteInfoIconType,
} from "../schema/site-info-schema";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { createSiteInfoIconDark } from "../lib/actions";
import { STATUS_TEXT } from "@/constants/enums";

/**
 * Set up form validation and a submit handler for creating a "site info icon (dark)".
 *
 * The hook configures a `react-hook-form` form validated by `CreateSiteInfoIconSchema`, exposes
 * a submit handler that performs the creation logic (including user feedback), and provides a
 * transition `isPending` flag for pending state.
 *
 * @returns An object containing:
 * - `form` — the `react-hook-form` instance configured for `CreateSiteInfoIconType`.
 * - `onSubmit` — the wrapped submit handler (`form.handleSubmit(...)`) that validates input and triggers creation.
 * - `isPending` — `true` when the creation transition is in progress, `false` otherwise.
 */
export default function useCreateSiteInfoIconDarkFormValidation() {
  const [isPending, startCreate] = useTransition();
  const form = useForm<CreateSiteInfoIconType>({
    resolver: zodResolver(CreateSiteInfoIconSchema),
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<CreateSiteInfoIconType> = (value) => {
    const icon = value?.icon;
    if (!icon) {
      toast.error("Please select an icon");
      return;
    }
    startCreate(async () => {
      try {
        const createdSiteInfoIconDarkRes = await createSiteInfoIconDark(icon);
        if (createdSiteInfoIconDarkRes.statusText !== STATUS_TEXT.SUCCESS) {
          toast.error(
            typeof createdSiteInfoIconDarkRes.msg === "string"
              ? createdSiteInfoIconDarkRes.msg
              : createdSiteInfoIconDarkRes.msg?.[0].field || createdSiteInfoIconDarkRes,
          );
        } else {
          toast.success(createdSiteInfoIconDarkRes.msg);
        }
      } catch (error) {
        toast.error("Error creating site info icon");
        console.error("Error creating site info icon:", error);
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
