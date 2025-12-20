import React from "react";
import { ArrowDown } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import { Button } from "../../components/ui/button";
import { useTranslations } from "next-intl";

type Props = {};

export default function Hero({}: Props) {
  const t = useTranslations("HomePage")
  console.log(t("title"))
  return (
      <header
        className="relative h-[calc(100dvh-100px)] box-border bg-center bg-cover bg-no-repeat bg-gray-100 rounded-4xl"
        style={{ backgroundImage: "url('/hero-bg.webp')" }}
      >
        <Button
          variant="outline"
          size="lg"
          className="absolute bg-transparent backdrop-blur-sm bottom-4 left-1/2 -translate-x-1/2 text-white"
        >
          {t("button")} <ArrowDown />
        </Button>
        <div className="flex flex-col items-center gap-4 bg-gray-100 rounded-3xl py-8 px-6 absolute md:bottom-4 md:top-auto top-1/2 md:right-4 right-1/2 md:translate-y-0 -translate-y-1/2 md:translate-x-0 translate-x-1/2 text-center">
          <h1 className="text-7xl font-medium">70+</h1>
          <p className="text-sm w-40">{t("description")}</p>
        </div>
      </header>
  );
}
