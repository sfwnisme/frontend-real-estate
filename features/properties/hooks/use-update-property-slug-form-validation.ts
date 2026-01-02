"use client";
import { useTransition } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { updatePropertySlug } from "@/features/properties/lib/actions";
import { toast } from "sonner";
import { STATUS_TEXT } from "@/constants/enums";
import {
  UpdatePropertySlugType,
  UpdatePropertySlugSchema,
} from "../schema/property-schema";
import { useRouter } from "next/navigation";
import { PAGES_ROUTES } from "@/constants/config";

export default function useUpdatePropertySlugFormValidation(
  propertyId: string,
  slug: string
) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const slugToText = slug
  .split('-')
  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
  .join(' ');

  const form = useForm<UpdatePropertySlugType>({
    resolver: zodResolver(UpdatePropertySlugSchema),
    defaultValues: {
      slug: slugToText,
    },
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<UpdatePropertySlugType> = (values) => {
    startTransition(async () => {
      try {
        console.log("property update data: ", {
          values,
          propertyId: propertyId,
        });
        const updatedPropertySlugRes = await updatePropertySlug(
          propertyId,
          values.slug
        );
        console.log("update property slug", updatedPropertySlugRes);
        if (updatedPropertySlugRes.statusText !== STATUS_TEXT.SUCCESS) {
          form.setError("slug", { message: updatedPropertySlugRes.msg.msg });
          toast.error(
            typeof updatedPropertySlugRes.msg === "string"
              ? updatedPropertySlugRes.msg
              : updatedPropertySlugRes.msg?.msg 
          );
          return;
        }
        toast.success(updatedPropertySlugRes.msg);
        router.push(
          PAGES_ROUTES.PROPERTIES.UPDATE +
            "/" +
            updatedPropertySlugRes?.data?.slug
        );
      } catch (error) {
        console.error("Error updating property slug:", error);
      }
    });
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    isPending,
  };
}
