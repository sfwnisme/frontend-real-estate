// "use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import { STATUS_TEXT } from "@/constants/enums";
import { CreateImageSchema, CreateImageType } from "@/features/properties/schema/image-schema";
import { createBlogPostImage } from "../lib/actions";

export default function useCreateBlogPostImageFormValidation(blogPostId: string) {
  const [isUploading, startUploading] = useTransition();
  const form = useForm<CreateImageType>({
    resolver: zodResolver(CreateImageSchema),
    defaultValues: {
      image: undefined,
      isFeatured: false,
    },
    mode: "onChange",
  });

  console.log("form", form.watch("image"));

  const onSubmit: SubmitHandler<CreateImageType> = async (values) => {
    try {
      if (values.image === undefined) {
        toast.error("No image selected.");
        return;
      }
      startUploading(async () => {
        toast.promise(
          createBlogPostImage(values.image, blogPostId),
          {
            loading: "Uploading image...",
            success: "Image uploaded successfully!",
            error: "Failed to upload image.",
          }
        );
      });
    } catch (error) {
      console.error("Error creating property:", error);
    }
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    isUploading,
  };
}
