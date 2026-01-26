"use client";
import { ImageType } from "@/types/types";
import { memo, useCallback, useMemo, useTransition } from "react";
import { useTranslations } from "next-intl";
import { deleteImage } from "@/lib/actions";
import { toast } from "sonner";
import { setFeaturedImage } from "@/features/properties/lib/actions";
import ImagePreview from "../../../../components/custom/image-preview";

type Props = {
  images: ImageType[] | null;
};

const UploadedPropertyImagesView = (props: Props) => {
  const images = props.images || [];
  const ownerId = images[0]?.ownerId;
  const [isPending, startTransition] = useTransition();
  const tToast = useTranslations("common.toast");
  console.log("TRIGGER: uploaded-images");
  const handleSetFeaturedImage = useCallback(
    async (id: string) => {
      startTransition(() => {
        toast.promise(
          async () => {
            const featuredImage = await setFeaturedImage(id, ownerId);
            if (!featuredImage.data) {
              throw new Error(
                featuredImage.msg || tToast("failedToSetFeaturedImage")
              );
            }
            // revalidateTag handles the data refresh automatically
            return featuredImage.data;
          },
          {
            loading: tToast("settingFeaturedImage"),
            success: tToast("featuredImageSet"),
            error: tToast("failedToSetFeaturedImage"),
          }
        );
      });
    },
    [ownerId, tToast]
  );
  
  const handleDeleteImage = useCallback(
    async (id: string) => {
      startTransition(() => {
        toast.promise(
          async () => {
            const deletedImage = await deleteImage(String(id), ownerId);
            if (!deletedImage.data) {
              throw new Error(deletedImage.msg || tToast("failedToDeleteImage"));
            }
            // No need for router.refresh() - revalidateTag handles it
            return deletedImage.data;
          },
          {
            loading: tToast("deletingImage"),
            success: tToast("imageDeleted"),
            error: tToast("failedToDeleteImage"),
          }
        );
      });
    },
    [ownerId, tToast]
  );

  const renderImagePreview = useMemo(() => {
    return (
      <div className="w-full py-2">
        <div className="grid rounded-2xl gap-2 w-full grid-cols-[repeat(auto-fill,minmax(150px,1fr))]">
          {images.map((image) => {
            return <ImagePreview 
            key={image._id} 
            imageSize={Number(image.size)} 
            imageType={image.mimeType} 
            imageUrl={image.url} 
            isFeatured={image.isFeatured} 
            disableSetFeaturedImage={false} 
            deleteImage={() => handleDeleteImage(image._id)}
            setFeaturedImage={() => handleSetFeaturedImage(image._id)}
            />;
          })}
        </div>
      </div>
    );
  }, [images, handleDeleteImage, handleSetFeaturedImage]);

  return (
    images.length > 0 && (
      <div className="overflow-y-auto flex gap-2 max-h-100 items-start">
        {renderImagePreview}
      </div>
    )
  );
}

export default memo(UploadedPropertyImagesView);