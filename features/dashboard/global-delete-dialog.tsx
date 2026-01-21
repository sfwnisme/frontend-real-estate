"use client";
import { useCallback, useTransition } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import LoadingSpinner from "@/components/custom/loading-spinner";
import { deleteDataByQueryParams } from "@/lib/actions";
import { STATUS_TEXT } from "@/constants/enums";
import { useTranslations } from "next-intl";

export default function GlobalDeleteDialog() {
  const t = useTranslations("Dialog");
  const tActions = useTranslations("common.actions");
  const endpointDialogText: Record<string, any> = {
    property: {
      endpoint: "/properties/delete/",
      title: t("deleteProperty.title"),
      description: t("deleteProperty.description"),
    },
    blog: {
      endpoint: "/blog-posts/delete/",
      title: t("deleteBlog.title"),
      description: t("deleteBlog.description"),
    },
    user: {
      endpoint: "/users/delete/",
      title: t("deleteUser.title"),
      description: t("deleteUser.description"),
    },
  };

  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const modal = searchParams.get("modal");
  const endpoint = searchParams.get("endpoint") as string;
  const id = searchParams.get("id");

  const [isDeletingProperty, startDeletingProperty] = useTransition();

  const handleCloseDialog = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("modal");
    params.delete("id");
    params.delete("endpoint");
    const newParams = params.toString();
    router.push(`${pathname}?${newParams}`);
  }, [searchParams, router, pathname]);

  const handleDeleteProperty = async () => {
    startDeletingProperty(async () => {
      const deleteResponse = await deleteDataByQueryParams(
        endpointDialogText[endpoint].endpoint,
        id,
      );

      if (deleteResponse.statusText === STATUS_TEXT.SUCCESS) {
        toast.success(deleteResponse.msg);
      } else {
        toast.error(deleteResponse.msg);
      }

      handleCloseDialog();
    });
  };

  return (
    <div>
      <Dialog open={modal !== null} onOpenChange={handleCloseDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader className="items-start">
            <DialogTitle>{endpointDialogText[endpoint]?.title}</DialogTitle>
            <DialogDescription className="text-start">
              {endpointDialogText[endpoint]?.description}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">{tActions("cancel")}</Button>
            </DialogClose>
            <Button
              type="button"
              variant="destructive"
              onClick={() => handleDeleteProperty()}
              disabled={isDeletingProperty}
            >
              {isDeletingProperty && <LoadingSpinner />}
              {tActions("delete")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
