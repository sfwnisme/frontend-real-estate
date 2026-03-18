import { ArrowDown } from "lucide-react";
import { Button } from "@/components/portal/button";
import { useTranslations } from "next-intl";
import { Typography } from "@/components/custom/typography";

type Props = {
  title: string;
  description: string;
  image: string;
};

export default function Hero({ title, description, image }: Props) {
  const t = useTranslations("SiteConfig");
  const tButton = useTranslations("HomePage");
  
  return (
    <header
      className="relative h-[calc(100dvh-100px)] box-border bg-center bg-cover bg-no-repeat bg-gray-100 rounded-4xl"
      style={{ backgroundImage: "url('/hero-bg.webp')" }}
    >
      <Button
        variant="glass"
        size="lg"
        className="absolute bottom-4 left-1/2 -translate-x-1/2"
      >
        {tButton("button")} <ArrowDown />
      </Button>
      <div className="flex flex-col items-center gap-10 bg-gray-100 rounded-3xl py-8 px-6 absolute md:bottom-4 md:top-auto top-1/2 md:right-4 right-1/2 md:translate-y-0 -translate-y-1/2 md:translate-x-0 translate-x-1/2 text-center">
        <Typography size="4xl" as="h1">{title}</Typography>
        <Typography size="sm" variant="muted" as="p" className="w-46">
          {description}
        </Typography>
      </div>
    </header>
  );
}
