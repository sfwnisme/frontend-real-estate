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
