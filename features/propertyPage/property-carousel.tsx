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
  locale: string;
};

export default async function PropertyCarousel({
  propertyId,
  propertyAlt,
  locale,
}: Props) {
  const propertyImages = await getPropertyImages(propertyId);
  const images = propertyImages.data;
  if (propertyImages.statusText !== STATUS_TEXT.SUCCESS) {
    return null;
  }

  images?.sort((a, b) =>
    a.isFeatured === b.isFeatured ? 0 : a.isFeatured ? -1 : 1,
  );

  return (
    <div
      data-component="carousel-container"
      className="flex items-center w-full justify-center rounded-2xl overflow-hidden"
    >
      <Carousel
        className="w-full max-w-full"
        opts={{
          direction: locale === "en"? "ltr": "rtl",
        }}
      >
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
