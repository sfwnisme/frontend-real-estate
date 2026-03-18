"use client";

import { cn } from "@/lib/utils";
import {
  Accordion as BaseAccordion,
  AccordionItem as BaseAccordionItem,
  AccordionTrigger as BaseAccordionTrigger,
  AccordionContent as BaseAccordionContent,
} from "@/components/ui/accordion";

function Accordion(props: React.ComponentProps<typeof BaseAccordion>) {
  return <BaseAccordion {...props} />;
}

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof BaseAccordionItem>) {
  return (
    <BaseAccordionItem
      className={cn("border-gray-100", className)}
      {...props}
    />
  );
}

function AccordionTrigger({
  className,
  ...props
}: React.ComponentProps<typeof BaseAccordionTrigger>) {
  return (
    <BaseAccordionTrigger
      className={cn(
        "hover:no-underline text-start text-lg lg:text-xl font-medium",
        className
      )}
      {...props}
    />
  );
}

function AccordionContent({
  className,
  ...props
}: React.ComponentProps<typeof BaseAccordionContent>) {
  return (
    <BaseAccordionContent
      className={cn("text-muted-foreground text-base", className)}
      {...props}
    />
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
