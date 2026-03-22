"use client";

import { useTransition } from "react";
import {
  CreateSiteInfoLogoSchema,
  CreateSiteInfoLogoType,
} from "../schema/site-info-schema";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { createSiteInfoLogo } from "../lib/actions";
import { STATUS_TEXT } from "@/constants/enums";

export default function useCreateSiteInfoLogoFormValidation() {
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
        const createdSiteInfoLogoRes = await createSiteInfoLogo(logo);
        console.log("createdSiteInfoLogoRes", createdSiteInfoLogoRes);
        const errorMessage =
          typeof createdSiteInfoLogoRes.msg === "string"
            ? createdSiteInfoLogoRes.msg
            : createdSiteInfoLogoRes.msg?.msg;
        if (createdSiteInfoLogoRes.statusText !== STATUS_TEXT.SUCCESS) {
          toast.error(errorMessage);
          form.setError("logo", {
            message: errorMessage,
          })
        } else {
          toast.success(createdSiteInfoLogoRes.msg);
        }
      } catch (error) {
        toast.error("Error creating site info logo");
        console.error("Error creating site info logo:", error);
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
