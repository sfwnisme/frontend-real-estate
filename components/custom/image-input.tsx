"use client";
import { UploadCloud } from "lucide-react";
import React, { forwardRef } from "react";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

type InputType = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const ImageInput = forwardRef<HTMLInputElement, InputType>(
  (props: InputType, ref) => {
    const t = useTranslations("common.form.placeholders")
    const inputId = React.useId();
    const { className, ...rest } = props;
    return (
      <div className={cn("h-50", className)}>
        <input
          type="file"
          id={inputId}
          style={{ display: "none" }}
          ref={ref}
          {...props}
          accept="image/*"
        />
        <label
          htmlFor={inputId}
          className="hover:bg-gray-50/50 duration-75 p-4 md:p-8 h-full w-full text-center text-sm md:text-base flex flex-col gap-2 items-center justify-center text-gray-500 rounded-2xl border-2 border-dashed cursor-pointer"
        >
          <div className="size-10">
          <UploadCloud />
          </div>
          <p>{t("chooseFile")}</p>
          <small>
            {t("webpPreferable")}
          </small>
          <Badge variant="outline" className="h-8">
            {t("browseFiles")}
          </Badge>
        </label>
      </div>
    );
  }
);

export default ImageInput;
