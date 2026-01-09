import Title from "@/components/custom/title";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  PAGES_ROUTES,
  WEBSITE_URL,
  WEBSITE_URL_AR,
  WEBSITE_URL_EN,
} from "@/constants/config";
import { routing } from "@/i18n/routing";
import { ChevronDown, Home } from "lucide-react";
import { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import Image from "next/image";

export const dynamic = "force-static";
export const revalidate = 2592000;

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const localeParam = locale === "en" ? "/en" : "";
  const canonical = `${WEBSITE_URL}${localeParam}${PAGES_ROUTES.ABOUT.PREVIEW}`;
  const enCanonical = `${WEBSITE_URL_EN}${PAGES_ROUTES.ABOUT.PREVIEW}`;
  const arCanonical = `${WEBSITE_URL_AR}${PAGES_ROUTES.ABOUT.PREVIEW}`;
  const t = await getTranslations("Metadata.about");
  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: canonical,
      languages: {
        "x-default": canonical,
        en: enCanonical,
        ar: arCanonical,
      },
    },
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
      images: [{ url: WEBSITE_URL + "/hero-bg.webp" }],
    },
  };
}

export default async function page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("AboutPage");
  return (
    <div className="flex flex-col gap-20">
      <div>
        <Title
          title={t("hero.title")}
          description={t("hero.description")}
          type="start"
        />
        <div className="grid grid-rows-2 md:grid-rows-1 grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 h-80 mt-10">
          <div className="rounded-2xl overflow-hidden h-full row-span-full md:col-span-1">
            <Image
              className="size-full object-cover"
              src="/hero-bg.webp"
              width="1000"
              height="1000"
              alt="image"
            />
          </div>
          <div className="rounded-2xl overflow-hidden h-full row-span-1 md:col-span-2">
            <Image
              className="size-full object-cover"
              src="/hero-bg.webp"
              width="1000"
              height="1000"
              alt="image"
            />
          </div>
          <div className="rounded-2xl overflow-hidden h-full">
            <Image
              className="size-full object-cover"
              src="/hero-bg.webp"
              width="1000"
              height="1000"
              alt="image"
            />
          </div>
        </div>
      </div>
      <div className="grid gap-8 md:gap-16">
        <Title
          type="with_badge"
          title={t("whyWorkWithUs.title")}
          badge={t("whyWorkWithUs.badge")}
        />
        <div className="grid md:grid-cols-4 gap-4">
          <div className="flex flex-col gap-2 text-start p-8">
            <h2 className="text-2xl font-semibold">150+</h2>
            <p>{t("whyWorkWithUs.stats.homesMatched")}</p>
          </div>
          <div className="flex flex-col gap-2 text-start p-8">
            <h2 className="text-2xl font-semibold">2,000+</h2>
            <p>{t("whyWorkWithUs.stats.clientsGuided")}</p>
          </div>
          <div className="md:col-span-2">
            <p className="text-base p-8">
              {t("whyWorkWithUs.stats.description")}
            </p>
          </div>
        </div>
      </div>
      <div>
        <Title
          type="with_icon"
          title={t("needHelp.title")}
          description={t("needHelp.description")}
          Icon={<Home />}
        />
        <div className="rounded-2xl overflow-hidden size-full mt-10 max-h-[600px]">
          <Image
            className="size-full object-cover"
            src="/hero-bg.webp"
            width="1000"
            height="1000"
            alt="image"
          />
        </div>
      </div>
      <div className="flex max-lg:flex-col items-start gap-8 lg:gap-16 justify-between responsive">
        <Title
          type="start"
          title={t("faq.title")}
          description={t("faq.description")}
        />
        <div className="w-full rounded-2xl overflow-hidden">
          <Accordion
            type="single"
            collapsible
            className="w-full"
            defaultValue="item-1"
          >
            {t
              .raw("faq.questions")
              .map((faq: { title: string; description: string }) => (
                <AccordionItem
                  value={faq.title}
                  key={faq.title}
                  className="border-gray-100 bg-white px-4"
                >
                  <AccordionTrigger>
                    {faq.title}
                    <ChevronDown
                      strokeWidth="1"
                      className="border border-gray-200 rounded-full "
                    />
                  </AccordionTrigger>
                  <AccordionContent className="flex flex-col gap-4 text-balance">
                    <p>{faq.description}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}
