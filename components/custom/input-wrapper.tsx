import React, { forwardRef } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Typography } from "./typography";

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
      <Typography
        as="small"
        size="xxs"
        variant="muted"
        className="flex min-h-4 h-full mt-1"
        hidden={!description}
      >
        {description}
      </Typography>
      <Typography
        as="small"
        size="xxs"
        variant="destructive"
        className="flex min-h-4 h-full mt-1"
        hidden={disableError}
      >
        {error}
      </Typography>
    </div>
  );
}
