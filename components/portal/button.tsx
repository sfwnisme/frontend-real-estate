"use client"
import { cn } from "@/lib/utils";
import { Button as BaseButton } from "@/components/ui/button";

const portalVariants = {
  sfwn: "bg-yellow-500 text-black hover:bg-yellow-600",
  glass: "border-0 border-transparent px-6! py-4 bg-black/10 hover:bg-black/10 backdrop-blur-sm rounded-full hover:py-6",
} as const;

type BaseVariant = NonNullable<React.ComponentProps<typeof BaseButton>["variant"]>;
type PortalVariant = keyof typeof portalVariants;
type BaseButtonProps = Omit<React.ComponentProps<typeof BaseButton>, "variant">;
type VariantsProp = {variant?: BaseVariant | PortalVariant};

type Props = BaseButtonProps & VariantsProp;

export const Button = ({ className, variant = "default", ...props }: Props) => {
  const portalClasses = variant in portalVariants ? portalVariants[variant as PortalVariant] : undefined;
  return (
    <BaseButton
      variant={portalClasses ? undefined : (variant as BaseVariant)}
      className={cn(portalClasses, className)}
      {...props}
    />
  );
};
