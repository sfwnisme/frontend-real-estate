"use client";
import { useTransition } from "react";
import {
  useForm,
  type SubmitHandler,
  useFieldArray,
  FieldArrayPath,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  createProperty,
  createPropertyImage,
} from "@/features/properties/lib/actions";
import { toast } from "sonner";
import { STATUS_TEXT, PROPERTY_TYPE, PROPERTY_STATUS } from "@/constants/enums";
import {
  CreatePropertyWithImagesType,
  CreatePropertyWithImagesSchema,
} from "../schema/property-schema";
import { PAGES_ROUTES } from "@/constants/config";

export default function useCreatePropertyWithImagesFormValidation() {
  const [isPending, startTransition] = useTransition();

  const form = useForm<CreatePropertyWithImagesType>({
    resolver: zodResolver(CreatePropertyWithImagesSchema),
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      propertySize: 0,
      bedrooms: 0,
      bathrooms: 0,
      garage: 0,
      garageSize: 0,
      yearBuilt: new Date().getFullYear(),
      propertyType: PROPERTY_TYPE.HOUSE,
      propertyStatus: PROPERTY_STATUS.FOR_SALE,
      features: "",
      hide: false,
      address: {
        country: "Saudi Arabia",
        state: "",
        city: "",
        area: "",
        zipCode: "",
        other: "",
      },
      images: [],
    },
    mode: "onBlur",
  });

  const fieldArray = useFieldArray({
    name: "images" as FieldArrayPath<CreatePropertyWithImagesType>,
    control: form.control,
  });

  const onSubmit: SubmitHandler<CreatePropertyWithImagesType> = (values) => {
    startTransition(async () => {
      const { images, ...propertyData } = values;
      try {
        // check if images not empty
        const isImagesEmpty = images.length == 0;
        let toastMessage = "";

        // start property loading
        // create property
        const createPropertyRes = await createProperty(propertyData);
        console.log("create property", createPropertyRes);
        const isPropertyCreated =
          createPropertyRes.statusText === STATUS_TEXT.SUCCESS;
        // stop property loading

        if (!isPropertyCreated) {
          toastMessage = `Error: ${createPropertyRes.msg?.msg}`;
          form.setError("root", {
            type: "manual",
            message: createPropertyRes.msg?.msg,
          });
          toast.error(toastMessage);
          return;
        } else {
          toastMessage = `Success: ${values.title} ${createPropertyRes.msg} ${
            isImagesEmpty && " with no images"
          }`;

          toast.success(toastMessage);
        }
        const propertyId = createPropertyRes.data?._id;
        const propertySlug = createPropertyRes.data?.slug;
        if (isImagesEmpty) {
          return;
        }
        // finish images loading
        const imagesPromises = images.map(async (img) => {
          const createImageResponse = await createPropertyImage(
            img.image,
            propertyId!,
            img.isFeatured
          );
          const isCreateImageSuccess =
            createImageResponse.statusText === STATUS_TEXT.SUCCESS;
          if (!isCreateImageSuccess) {
            toast.error(`Error: ${createImageResponse.msg}`);
          }
          return createImageResponse;
        });
        const imagesPromiseRes = toast.promise(Promise.all(imagesPromises), {
          loading: "Uploading images...",
          success: images.length + " Images uploaded successfully!",
          error: "Failed to upload images.",
          action: {
            label: "View Property",
            onClick: () => {
              window.location.pathname = `${PAGES_ROUTES.PROPERTIES.PREVIEW}/${propertySlug}`;
            },
          },
        });
        console.log("all images promise", imagesPromiseRes);
      } catch (error) {
        console.error("Error creating property:", error);
      }
    });
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    isPending,
    fieldArray,
  };
}
