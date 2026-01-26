import Image from "next/image";
import { cn, returnFileSize } from "@/lib/utils";
import { Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";

type Props = {
  imageSize: number;
  imageType: string;
  imageUrl: string;
  isFeatured?: boolean;
  disableSetFeaturedImage?: boolean;
  deleteImage?: () => void;
  disableDeleteImage?: boolean;
  setFeaturedImage?: () => void;
  isLoading?: boolean;
  error?: string | null;
};

const ImageError = (props: {
  error?: string | null;
  deleteImage: () => void | undefined;
}) => {
  const { error, deleteImage } = props;
  return (
    <div className="z-10 flex flex-col gap-2 items-center justify-center text-center size-full absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-white/70 p-2">
      {<small className="text-xs text-destructive">{error}</small>}
      <Button variant="destructive" size="sm" onClick={deleteImage}>
        Remove
      </Button>
    </div>
  );
};

export default function ImagePreview(props: Props) {
  return (
    <div
      className={cn(
        "group flex flex-col relative aspect-square rounded-md overflow-hidden border data-[featured=true]:border-yellow-500",
      )}
      data-featured={props.isFeatured}
      data-error={!!props.error}
    >
      {props.error && (
        <ImageError
          error={props.error}
          deleteImage={props.deleteImage ?? (() => {})}
        />
      )}
      <Image
        src={props.imageUrl}
        width={"300"}
        height={"300"}
        alt={props.imageType}
        className="object-cover size-full"
      />
      <div className="flex flex-col gap-1 p-2 absolute bottom-0 left-0 w-full bg-white/20 backdrop-blur-xs text-black group-data-[featured=true]:bg-yellow-500/50">
        <div className="flex gap-1 items-center justify-between w-full">
          <small className="text-xs">
            {returnFileSize(props.imageSize)},{" "}
            {props.imageType.split("/")[1].toUpperCase()}
          </small>
          {!props.disableSetFeaturedImage && (
            <Label
              className={cn("flex items-center gap-1")}
              title="Set as main image"
            >
              <Checkbox
                id={props.imageUrl + "featured"}
                className={cn(
                  "data-[state=checked]:border-yellow-500 data-[state=checked]:bg-yellow-500 data-[state=checked]:text-white dark:data-[state=checked]:border-yellow-500 dark:data-[state=checked]:bg-yellow-500 disabled:cursor-not-allowed!",
                )}
                checked={props.isFeatured}
                onCheckedChange={props.setFeaturedImage}
                disabled={props.disableSetFeaturedImage}
              />
            </Label>
          )}
        </div>
      </div>
      <div className="z-10 absolute top-2 right-2 flex flex-col gap-2 items-center justify-center group-data-[error=true]:hidden">
        <div className={cn("flex items-center justify-between gap-2")}>
          <Button
            variant="destructive"
            size="icon"
            onClick={props.deleteImage}
            disabled={props.disableDeleteImage}
            className="bg-destructive/40 hover:bg-destructive/70 text-white size-8"
            aria-label="delete image"
            title="Delete image"
          >
            <Trash2 className="text-white" />
          </Button>
        </div>
      </div>
    </div>
  );
}
