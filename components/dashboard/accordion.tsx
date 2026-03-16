import { cn } from "@/lib/utils";
import {
  Accordion as BaseAccordion,
  AccordionItem as BaseAccordionItem,
  AccordionTrigger as BaseAccordionTrigger,
  AccordionContent as BaseAccordionContent,
} from "@/components/ui/accordion";

type AccordionProps = React.ComponentProps<typeof BaseAccordion>;
type AccordionItemProps = React.ComponentProps<typeof BaseAccordionItem>;
type AccordionTriggerProps = React.ComponentProps<
  typeof BaseAccordionTrigger
> & {
  icon?: React.ElementType;
};
type AccordionContentProps = React.ComponentProps<typeof BaseAccordionContent>;
function Accordion({ className, ...props }: AccordionProps) {
  return (
    <BaseAccordion
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  );
}

function AccordionItem({ className, ...props }: AccordionItemProps) {
  return (
    <BaseAccordionItem
      className={cn("border last:border-b rounded-lg", className)}
      {...props}
    />
  );
}

function AccordionTrigger({
  className,
  children,
  icon: Icon,
  ...props
}: AccordionTriggerProps) {
  return (
    <BaseAccordionTrigger
      className={cn(
        "hover:no-underline hover:bg-primary-foreground/50 p-4 rounded-none flex items-start",
        className,
      )}
      {...props}
    >
      <div className="flex gap-2">
        {Icon && (
          <div className="bg-secondary rounded-lg p-2 w-fit self-start">
            <Icon className="size-6 text-secondary-foreground" />
          </div>
        )}
        <div className="flex flex-col gap-0 items-start">{children}</div>
      </div>
    </BaseAccordionTrigger>
  );
}

function AccordionContent({ className, ...props }: AccordionContentProps) {
  return (
    <BaseAccordionContent
      className={cn("p-4 border-t", className)}
      {...props}
    />
  );
}
export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
