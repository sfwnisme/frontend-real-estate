import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { getPropertyImages } from "@/lib/requests";
import { STATUS_TEXT } from "@/constants/enums";

type Props = {
  propertyId: string;
  propertyAlt: string;
};

export default async function PropertyCarousel({
  propertyId,
  propertyAlt,
}: Props) {
  const propertyImages = await getPropertyImages(propertyId, "force-cache");
  const images = propertyImages.data;
  console.log("images carousel", images)
  if (propertyImages.statusText !== STATUS_TEXT.SUCCESS) {
    return null;
  }

  images?.sort((a, b) => a.isFeatured === b.isFeatured? 0: a.isFeatured? -1:1)
  console.log("sorted images by boolean value: ", images)

  // const featuredImage = images?.filter((img) => img.isFeatured)[0]
  // console.log("the featured image" ,featuredImage)
  return (
    <div
      data-component="carousel-container"
      className="flex items-center w-full justify-center rounded-2xl overflow-hidden"
    >
      <Carousel className="w-full max-w-full">
        <CarouselContent className="lg:h-140 m-0! gap-4">
          {/* {featuredImage && <CarouselItem className="rounded-2xl pl-0!">
              <Image
                src={featuredImage?.url}
                width={featuredImage?.dimensions?.width || "1900"}
                height={featuredImage?.dimensions?.width || "1000"}
                alt={`${propertyAlt} - ${featuredImage?.fileName}`}
                className="size-full object-cover"
                key={featuredImage?._id}
              />
            </CarouselItem>} */}

          {images?.map((image) => (
            <CarouselItem className="rounded-2xl pl-0!">
              <Image
                src={image.url}
                width={image.dimensions?.width || "1900"}
                height={image.dimensions?.width || "1000"}
                alt={`${propertyAlt} - ${image.fileName}`}
                className="size-full object-cover"
                key={image._id}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4 bg-gray-900/80 text-gray-50" />
        <CarouselNext className="right-4 bg-gray-900/80 text-gray-50 border-transparent" />
      </Carousel>
    </div>
  );
}
