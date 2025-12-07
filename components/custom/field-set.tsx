import React from "react";
import { cn } from "@/lib/utils";
import { Separator } from "../ui/separator";

type Props = {
  title: string;
  children: React.ReactNode;
  description?: string;
  className?: string;
  childrenClassName?: string;
  variant?: "default" | "container";
  error?: string;
};

export default function FieldSet({
  title,
  variant = "default",
  children,
  description,
  className,
  childrenClassName,
  error,
}: Props) {
  return (
    <fieldset className={cn("border rounded-lg w-full", className)}>
      {variant === "default" && (
        <div className="p-4 flex flex-col gap-1">
          <h3 className="text-md font-semibold text-primary">{title}</h3>
          {description && (
            <p className="text-[13px] text-muted-foreground">{description}</p>
          )}
        </div>
      )}
      {variant === "default" && <Separator />}
      <div className={cn("p-4 w-full", childrenClassName)}>{children}</div>
      <small className={cn("min-h-4 h-full text-xs pb-4 px-4 inline-block text-destructive invisible", error && "visible")}>{error}</small>
    </fieldset>
  );
}
