import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useLocale } from "next-intl";
import Link from "next/link";
import { Link as NextIntlLink } from "@/i18n/navigation";
import React from "react";

type Props = {
  children: React.ReactNode;
  href: string;
  icon?: "visible" | "invisible";
};

export default function ButtonLink({
  children,
  href,
  icon = "visible",
}: Props) {
  const locale = useLocale();

  const rtlArrow = (
    <div className="inline-flex items-center relative left-0 group-hover/button:-left-[20px] transition-right duration-300 group-hover/button:transition-right group-hover/button:duration-300">
      <ArrowLeft size="20px" className="text-gray-500 shrink-0" />
      <ArrowLeft
        size="20px"
        className="text-gray-500 shrink-0 group-hover/button:opacity-0 duration-200"
      />
    </div>
  );

  const ltrArrow = (
    <div className="inline-flex items-center relative -left-[20px] group-hover/button:left-0 transition-left duration-300 group-hover/button:transition-left group-hover/button:duration-300">
      <ArrowRight size="20px" className="text-gray-500 shrink-0" />
      <ArrowRight size="20px" className="text-gray-500 shrink-0 group-hover/button:opacity-0 duration-200" />
    </div>
  );
  return (
    <NextIntlLink href={href} className="group/button flex flex-row items-center gap-3">
      {children}
      {icon === "visible" && (
        <div className={cn("w-[20px] overflow-hidden inline-flex items-center", locale === "ar" && "flex-row-reverse")}>
          {locale === "ar" ? rtlArrow : ltrArrow}
        </div>
      )}
    </NextIntlLink>
  );
}
