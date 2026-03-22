"use client";

import React, { useTransition } from "react";
import {
  CreateSiteInfoIconSchema,
  CreateSiteInfoIconType,
} from "../schema/site-info-schema";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { createSiteInfoIcon } from "../lib/actions";
import { STATUS_TEXT } from "@/constants/enums";

export default function useCreateSiteInfoIconFormValidation() {
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
        const createdSiteInfoIconRes = await createSiteInfoIcon(icon);
        console.log(createdSiteInfoIconRes);
        const errorMessage = typeof createdSiteInfoIconRes.msg === "string"
          ? createdSiteInfoIconRes.msg
          : createdSiteInfoIconRes.msg?.msg;
        if (createdSiteInfoIconRes.statusText !== STATUS_TEXT.SUCCESS) {
          toast.error(errorMessage);
          form.setError("icon", {
            message: errorMessage,
          })
        } else {
          toast.success(createdSiteInfoIconRes.msg);
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
