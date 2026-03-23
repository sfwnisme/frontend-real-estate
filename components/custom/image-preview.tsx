"use client";
import Image from "next/image";
import { cn, returnFileSize } from "@/lib/utils";
import { X } from "lucide-react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import LoadingSpinner from "./loading-spinner";
import { Typography } from "./typography";

type Props = {
  imageUrl: string;
  imageSize: number;
  imageType: string;
  isFeatured?: boolean;
  disableSetFeaturedImage?: boolean;
  deleteImage?: () => void;
  disableDeleteImage?: boolean;
  hideDeleteImage?: boolean;
  setFeaturedImage?: () => void;
  isLoading?: boolean;
  error?: string | null;
  aspectRatio?: "video" | "square" | "auto";
  hideInfo?: boolean;
  className?: string;
};

const ImageError = (props: {
  error?: string | null;
  deleteImage: () => void | undefined;
}) => {
  const { error, deleteImage } = props;
  return (
    <div className="z-10 flex flex-col gap-2 items-center justify-center text-center size-full absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-primary/70 p-2">
      {<small className="text-xs text-destructive">{error}</small>}
      <Button
        variant="destructive"
        size="sm"
        onClick={deleteImage}
        type="button"
      >
        Remove
      </Button>
    </div>
  );
};

const ImageLoading = () => {
  return (
    <div className="size-full absolute grid place-items-center">
      <LoadingSpinner />
    </div>
  );
};

export default function ImagePreview(props: Props) {
  const {
    imageSize = 0,
    imageType = "",
    imageUrl = "",
    isFeatured = false,
    disableSetFeaturedImage = false,
    deleteImage = () => {},
    disableDeleteImage = false,
    hideDeleteImage = false,
    setFeaturedImage = () => {},
    isLoading = false,
    error = null,
    aspectRatio = "square",
    hideInfo = false,
    className = "",
  } = props;

  const aspectRatioClass =
    aspectRatio === "video"
      ? "aspect-video"
      : aspectRatio === "square"
        ? "aspect-square"
        : "aspect-auto";
  return (
    <div
      className={cn(
        "group flex flex-col relative rounded-md overflow-hidden border bg-foreground/20",
        aspectRatioClass,
        className,
      )}
      data-featured={isFeatured}
      data-error={!!error}
    >
      {isLoading && <ImageLoading />}
      {error && (
        <ImageError error={error} deleteImage={deleteImage ?? (() => {})} />
      )}
      <Image
        src={imageUrl}
        width={"300"}
        height={"300"}
        alt={imageType}
        className="object-contain size-full"
      />
      <div className="flex flex-col items-end justify-end gap-1 p-2 absolute bottom-0 left-0 size-full bg-linear-to-t from-black/40 to-transparent text-black">
        <div className="flex gap-1 items-center justify-between w-full">
          <Typography
            as="small"
            size="xxs"
            className="text-white"
            hidden={hideInfo}
          >
            {returnFileSize(imageSize)}, {imageType.split("/")[1].toUpperCase()}
          </Typography>
          {!disableSetFeaturedImage && (
            <Label
              className={cn("flex items-center gap-1")}
              title="Set as main image"
            >
              <Checkbox
                id={imageUrl + "featured"}
                className={cn(
                  "data-[state=checked]:border-yellow-500 data-[state=checked]:bg-yellow-500 data-[state=checked]:text-white dark:data-[state=checked]:border-yellow-500 dark:data-[state=checked]:bg-yellow-500 disabled:cursor-not-allowed!",
                )}
                checked={isFeatured}
                onCheckedChange={setFeaturedImage}
                disabled={disableSetFeaturedImage}
              />
            </Label>
          )}
        </div>
      </div>
      {!hideDeleteImage && (
        <div className="absolute top-2 right-2 flex flex-col gap-2 items-center justify-center group-data-[error=true]:hidden">
          <div className={cn("flex items-center justify-between gap-2")}>
            <Button
              variant="secondary"
              size="icon"
              onClick={deleteImage}
              disabled={disableDeleteImage}
              className="rounded-full size-6"
              aria-label="delete image"
              title="Delete image"
              type="button"
            >
              <X />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
