// "use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import { createPropertyImage, createTempPropertyImage } from "../lib/actions";
import { STATUS_TEXT } from "@/constants/enums";
import {
  CreateArrayImagesType,
  CreateArrayImagesSchema,
} from "../schema/image-schema";

export default function useCreateImagesFormValidation(propertyId: string) {
  const [isUploading, startUploading] = useTransition();
  const form = useForm<CreateArrayImagesType>({
    resolver: zodResolver(CreateArrayImagesSchema),
    defaultValues: {
      images: [],
    },
    mode: "onChange",
  });

  const fieldArray = useFieldArray({
    name: "images",
    control: form.control,
  });

  const onSubmit: SubmitHandler<CreateArrayImagesType> = async (values) => {
    console.log("property images values: ", values);
    const images = values.images.map((image) => ({
      image: image.image,
      isFeatured: image.isFeatured,
    }));
    console.log("property images: ", images);
    try {
      if (!images || images.length === 0) {
        toast.error("No images selected.");
        return;
      }
      const isImagesEmpty = images.length === 0;
      if (isImagesEmpty) {
        toast.error("No images selected.");
        return;
      }
      startUploading(async () => {
        const imagesPromises = images.map(async (image) => {
          const createImageResponse = await createPropertyImage(
            image.image,
            propertyId,
            image.isFeatured
          );
          const isCreateImageSuccess =
            createImageResponse.statusText === STATUS_TEXT.SUCCESS;
          if (!isCreateImageSuccess) {
            form.setError("root", {
              type: "not successful",
              message: createImageResponse.msg,
            });
            toast.error(createImageResponse.msg);
            return;
          }
          return createImageResponse;
        });
        toast.promise(
          Promise.all(imagesPromises)
            /* remove images on finish */
            .then(() => form.reset()),
          {
            loading: "Uploading images...",
            success: `${images.length} Images uploaded successfully!`,
            error: "Failed to upload images.",
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
    fieldArray,
  };
}
