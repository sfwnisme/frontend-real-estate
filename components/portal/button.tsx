import { cn } from "@/lib/utils";
import { Button as BaseButton, buttonVariants } from "@/components/ui/button";
import { cva, type VariantProps } from "class-variance-authority";

// add specific variants on top of shadcn
const portalButtonVariants = cva("", {
  variants: {
    intent: {
      action: "bg-indigo-600 text-white hover:bg-indigo-700 font-semibold",
      danger: "bg-red-600 text-white hover:bg-red-700",
      glass: "border-0 border-transparent px-6! py-4 bg-black/10 hover:bg-black/10 backdrop-blur-sm rounded-full hover:py-6"
    },
  },
});

type Props = React.ComponentProps<typeof BaseButton> &
  VariantProps<typeof portalButtonVariants>;

export const Button = ({ className, intent, ...props }: Props) => (
  <BaseButton
    className={cn(portalButtonVariants({ intent }), className)}
    {...props}
  />
);
