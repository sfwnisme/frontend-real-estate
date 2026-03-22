import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const typographyVariants = cva("", {
  variants: {
    variant: {
      default: "",
      muted: "text-muted-foreground",
    },
    size: {
      xxs: "text-[10px] sm:text-xs",
      xs: "text-xs sm:text-sm",
      sm: "text-sm leading-7 sm:text-base",
      base: "text-base sm:text-lg md:text-xl",
      lg: "text-base font-semibold sm:text-lg",
      xl: "scroll-m-20 text-base font-semibold tracking-tight sm:text-lg md:text-xl",
      "2xl": "scroll-m-20 text-lg font-semibold tracking-tight sm:text-xl md:text-2xl",
      "3xl": "scroll-m-20 text-xl font-semibold tracking-tight sm:text-2xl md:text-3xl",
      "4xl": "scroll-m-20 text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl lg:text-5xl leading-[1.5]",
      quote: "mt-4 border-l-2 pl-4 italic sm:mt-6 sm:pl-6",
    }
  },
  defaultVariants: {
    variant: "default",
    size: "sm",
  },
});

type TypographyElement =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "p"
  | "span"
  | "small"
  | "strong"
  | "em"
  | "blockquote";

type TypographyProps = {
  as?: TypographyElement;
  className?: string;
  children?: React.ReactNode;
} & VariantProps<typeof typographyVariants> &
  React.HTMLAttributes<HTMLElement>;

function Typography({
  as = "p",
  variant,
  size,
  className,
  children,
  ...props
}: TypographyProps) {
  const Component = as;
  return (
    <Component
      data-slot="typography"
      className={cn(typographyVariants({ variant, size, className }))}
      {...props}
    >
      {children}
    </Component>
  );
}

export { Typography, typographyVariants };
