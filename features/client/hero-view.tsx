import { ArrowDown } from "lucide-react";
import { Button } from "../../components/ui/button";
import { useTranslations } from "next-intl";
import { Typography } from "@/components/custom/typography";

type Props = {};

export default function Hero({}: Props) {
  const t = useTranslations("SiteConfig");
  const tButton = useTranslations("HomePage");
  console.log(t("title"));
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
        {tButton("button")} <ArrowDown />
      </Button>
      <div className="flex flex-col items-center gap-10 bg-gray-100 rounded-3xl py-8 px-6 absolute md:bottom-4 md:top-auto top-1/2 md:right-4 right-1/2 md:translate-y-0 -translate-y-1/2 md:translate-x-0 translate-x-1/2 text-center">
        <Typography variant="h1" as="h1">{t("name")}</Typography>
        <Typography variant="pMuted" as="p" className="w-46">
          {t("description")}
        </Typography>
      </div>
    </header>
  );
}
