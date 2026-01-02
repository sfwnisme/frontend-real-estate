"use client";
import { useTransition } from "react";
import {
  useForm,
  type SubmitHandler,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  updateProperty,
} from "@/features/properties/lib/actions";
import { toast } from "sonner";
import { STATUS_TEXT } from "@/constants/enums";
import {
  UpdatePropertyType,
  UpdatePropertySchema,
} from "../schema/property-schema";
import { Property } from "@/types/types";

export default function useUpdatePropertyFormValidation(property: Property) {
  const [isPending, startTransition] = useTransition();

  const form = useForm<UpdatePropertyType>({
    resolver: zodResolver(UpdatePropertySchema),
    defaultValues: {
      title: property.title,
      description: property.description,
      price: property.price,
      propertySize: property.propertySize,
      bedrooms: property.bedrooms,
      bathrooms: property.bathrooms,
      garage: property.garage,
      garageSize: property.garageSize,
      yearBuilt: property.yearBuilt,
      propertyType: property.propertyType,
      propertyStatus: property.propertyStatus,
      features: property.features,
      hide: property.hide,
      address: {
        country: property.address.country,
        state: property.address.state,
        city: property.address.city,
        area: property.address.area,
        zipCode: property.address.zipCode,
        other: property.address.other,
      },
    },
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<UpdatePropertyType> = (values) => {
    startTransition(async () => {
      try {
        console.log("property update data: ", {
          values,
          propertyId: property._id,
        });
        const updatedPropertyRes = await updateProperty(values, property._id);
        console.log("update property", updatedPropertyRes);
        if (updatedPropertyRes.statusText !== STATUS_TEXT.SUCCESS) {
          toast.error(
            typeof updatedPropertyRes.msg === "string"
              ? updatedPropertyRes.msg
              : updatedPropertyRes.msg?.[0].field || updatedPropertyRes.msg
          );
        } else {
          toast.success(updatedPropertyRes.msg);
        }
      } catch (error) {
        console.error("Error updating property:", error);
      }
    });
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    isPending,
  };
}
