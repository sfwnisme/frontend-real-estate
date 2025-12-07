import React, { forwardRef } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type Props = {
  title?: string;
  description?: string;
  error?: string;
  disableError?: boolean;
  name?: string;
  className?: string;
  children: React.ReactNode;
  childrenClassName?: string;
};

export default function InputWrapper(props: Props) {
  const {
    title,
    description,
    error,
    disableError,
    className,
    children,
    childrenClassName,
  } = props;
  return (
    <div className={cn("flex flex-col w-full", className)}>
      <Label className="h-[15px] flex flex-col items-start gap-2 size-full cursor-pointer">
        {title}
        <div className={cn("flex flex-col size-full", childrenClassName)}>
          {children}
        </div>
      </Label>
      <small
        className="flex min-h-4 h-full text-xs mt-1 text-primary/60"
        hidden={!description}
      >
        {description}
      </small>
      <small
        className="flex min-h-4 h-full text-xs mt-1 text-destructive"
        hidden={disableError}
      >
        {error}
      </small>
    </div>
  );
}
