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

/**
 * Wraps form input content with an optional title label, optional description text, and optional error text.
 *
 * @param props - Component props.
 * @param props.title - Label text rendered above the input content.
 * @param props.description - Muted helper text shown under the input when provided.
 * @param props.error - Destructive-styled error message shown under the input unless suppressed.
 * @param props.disableError - When truthy, hides the `error` text.
 * @param props.className - Additional classes applied to the outer container.
 * @param props.children - The input or control elements to render inside the wrapper.
 * @param props.childrenClassName - Additional classes applied to the container that wraps `children`.
 * @returns A React element that renders the labeled input wrapper with optional helper and error text.
 */
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
