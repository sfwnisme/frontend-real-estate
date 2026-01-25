import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const typographyVariants = cva("", {
  variants: {
    variant: {
      h1: "scroll-m-20 text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl lg:text-5xl leading-[1.5]",
      h1Muted:
        "scroll-m-20 text-2xl font-bold tracking-tight text-muted-foreground sm:text-3xl md:text-4xl lg:text-5xl leading-[1.5]",
      h2: "scroll-m-20 text-xl font-semibold tracking-tight sm:text-2xl md:text-3xl",
      h2Muted:
        "scroll-m-20 text-xl font-semibold tracking-tight text-muted-foreground sm:text-2xl md:text-3xl",
      h3: "scroll-m-20 text-lg font-semibold tracking-tight sm:text-xl md:text-2xl",
      h3Muted:
        "scroll-m-20 text-lg font-semibold tracking-tight text-muted-foreground sm:text-xl md:text-2xl",
      h4: "scroll-m-20 text-base font-semibold tracking-tight sm:text-lg md:text-xl",
      h4Muted:
        "scroll-m-20 text-base font-semibold tracking-tight text-muted-foreground sm:text-lg md:text-xl",
      h5: "scroll-m-20 text-sm font-semibold tracking-tight sm:text-base md:text-lg",
      h5Muted:
        "scroll-m-20 text-sm font-semibold tracking-tight text-muted-foreground sm:text-base md:text-lg",
      h6: "scroll-m-20 text-sm font-semibold tracking-tight sm:text-base",
      h6Muted:
        "scroll-m-20 text-sm font-semibold tracking-tight text-muted-foreground sm:text-base",
      p: "text-sm leading-7 sm:text-base [&:not(:first-child)]:mt-4 sm:[&:not(:first-child)]:mt-6",
      pMuted:
        "text-sm text-muted-foreground leading-7 sm:text-base [&:not(:first-child)]:mt-4 sm:[&:not(:first-child)]:mt-6",
      lead: "text-base sm:text-lg md:text-xl",
      leadMuted: "text-base text-muted-foreground sm:text-lg md:text-xl",
      large: "text-base font-semibold sm:text-lg",
      largeMuted: "text-base font-semibold text-muted-foreground sm:text-lg",
      small: "text-xs sm:text-sm",
      smallMuted: "text-xs text-muted-foreground sm:text-sm",
      muted: "text-xs text-muted-foreground sm:text-sm",
      blockquote: "mt-4 border-l-2 pl-4 italic sm:mt-6 sm:pl-6",
      blockquoteMuted:
        "mt-4 border-l-2 pl-4 italic text-muted-foreground sm:mt-6 sm:pl-6",
    },
  },
  defaultVariants: {
    variant: "p",
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
  className,
  children,
  ...props
}: TypographyProps) {
  const Component = as;
  return (
    <Component
      data-slot="typography"
      className={cn(typographyVariants({ variant, className }))}
      {...props}
    >
      {children}
    </Component>
  );
}

export { Typography, typographyVariants };
