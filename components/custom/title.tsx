"use client";
import { ArrowRight, LucideIcon, LucideProps } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import ButtonLink from "./button-link";
import { Badge } from "../ui/badge";
import { useTranslations } from "next-intl";
import React from "react";

type Props = {
  type?: "center" | "start" | "with_button" | "with_badge" | "with_icon";
  title: string;
  description?: string;
  url?: string;
  badge?: string;
  Icon?: React.ReactElement<LucideProps>;
};
function TitleWithButton({
  title,
  description,
  url = "#",
}: Omit<Props, "type" | "badge">) {
  const tActions = useTranslations("common.actions");
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
      <h1 className="text-2xl md:text-4xl font-medium">{title}</h1>
      <div className="flex flex-col justify-between items-start gap-4 md:gap-8">
        {description && <p className="text-gray-500">{description}</p>}
        <ButtonLink href={url}>{tActions("viewAll")}</ButtonLink>
      </div>
    </div>
  );
}
function TitleAlignStartWithBadge({
  title,
  description,
  badge,
}: Omit<Props, "type" | "url">) {
  return (
    <div className="flex flex-col gap-4 items-start">
      <Badge className="text-sm text-black font-light bg-blue-200 rounded-full px-4 py-1">
        {badge}
      </Badge>
      <h1 className="text-2xl md:text-4xl font-medium">{title}</h1>
      {description && <p className="text-gray-500">{description}</p>}
    </div>
  );
}
function TitleAlignStart({
  title,
  description,
}: Pick<Props, "title" | "description">) {
  return (
    <div className="flex flex-col gap-4 items-start">
      <h1 className="text-2xl md:text-4xl font-medium">{title}</h1>
      {description && <p className="text-gray-500">{description}</p>}
    </div>
  );
}
function TitleAlignCenter({
  title,
  description,
}: Pick<Props, "title" | "description">) {
  return (
    <div className="flex flex-col gap-4 items-center">
      <h1 className="text-2xl md:text-4xl font-medium">{title}</h1>
      {description && <p className="text-gray-500">{description}</p>}
    </div>
  );
}

function TitleAlignCenterWithIcon({
  title,
  description,
  Icon,
}: Pick<Props, "title" | "description" | "Icon">) {
  return (
    <div className="flex flex-col gap-4 items-center">
      {Icon && (
        <div className="bg-gray-900 p-3 rounded-md">
          {React.cloneElement(Icon, {
            size: 24,
            strokeWidth: 1.5,
            color: "white",
          })}
        </div>
      )}
      <h1 className="text-2xl md:text-4xl font-medium">{title}</h1>
      {description && <p className="text-gray-500">{description}</p>}
    </div>
  );
}

export default function Title({
  type = "center",
  title,
  description,
  url,
  badge,
  Icon,
}: Props) {
  if (type === "start")
    return <TitleAlignStart title={title} description={description} />;
  if (type === "with_button")
    return (
      <TitleWithButton title={title} description={description} url={url} />
    );
  if (type === "with_badge")
    return (
      <TitleAlignStartWithBadge
        title={title}
        description={description}
        badge={badge}
      />
    );
  if (type === "with_icon")
    return (
      <TitleAlignCenterWithIcon
        title={title}
        description={description}
        Icon={Icon}
      />
    );
  return <TitleAlignCenter title={title} description={description} />;
}
