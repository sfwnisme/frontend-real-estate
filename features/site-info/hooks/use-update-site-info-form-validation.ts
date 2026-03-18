"use client";

import { useTransition } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { SiteInfoSchema, UpdateSiteInfoType } from "../schema/site-info-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { SiteInfo } from "@/types/types";
import { updateSiteInfo } from "../lib/actions";
import { STATUS_TEXT } from "@/constants/enums";
import { toast } from "sonner";

export default function useUpdateSiteInfoFormValidation(siteInfo: SiteInfo) {
  const [isPending, startUpdate] = useTransition();

  const form = useForm<UpdateSiteInfoType>({
    resolver: zodResolver(SiteInfoSchema),
    defaultValues: {
      ar: {
        info: siteInfo.ar.info,
        seo: siteInfo.ar.seo,
      },
      en: {
        info: siteInfo.en.info,
        seo: siteInfo.en.seo,
      },
      contact: siteInfo.contact,
      marketing: siteInfo.marketing,
      settings: siteInfo.settings,
    },
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<UpdateSiteInfoType> = (values) => {
    startUpdate(async () => {
      try {
        console.log("site info update: ", {
          values,
        });
        const updatedSiteInfoRes = await updateSiteInfo(values);
        if (updatedSiteInfoRes.statusText !== STATUS_TEXT.SUCCESS) {
          toast.error(
            typeof updatedSiteInfoRes.msg === "string"
              ? updatedSiteInfoRes.msg
              : updatedSiteInfoRes.msg?.[0].field || updatedSiteInfoRes,
          );
        } else {
          toast.success(updatedSiteInfoRes.msg);
        }
      } catch (error) {
        console.error("Error updating site info:", error);
      }
    });
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    isPending,
  };
}
