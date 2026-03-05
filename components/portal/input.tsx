import { cn } from "@/lib/utils";
import { Input as BaseInput } from "@/components/ui/input";
import { cva, type VariantProps } from "class-variance-authority";

const portalInputVariants = cva(
  "border-2 rounded-lg bg-slate-900/50 text-white placeholder:text-slate-400 focus-visible:ring-indigo-500/50 focus-visible:border-indigo-500",
  {
    variants: {
      intent: {
        default: "border-slate-700",
        error: "border-red-500 focus-visible:ring-red-500/50 focus-visible:border-red-500",
        success: "border-emerald-500 focus-visible:ring-emerald-500/50 focus-visible:border-emerald-500",
      },
      inputSize: {
        sm: "h-8 text-xs px-2",
        md: "h-10 text-sm px-3",
        lg: "h-12 text-base px-4",
      },
    },
    defaultVariants: {
      intent: "default",
      inputSize: "md",
    },
  }
);

type Props = React.ComponentProps<typeof BaseInput> &
  VariantProps<typeof portalInputVariants>;

export const Input = ({ className, intent, inputSize, ...props }: Props) => (
  <BaseInput
    className={cn(portalInputVariants({ intent, inputSize }), className)}
    {...props}
  />
);
