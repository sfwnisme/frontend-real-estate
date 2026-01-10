import Title from "@/components/custom/title";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  PAGES_ROUTES,
} from "@/constants/config";
import { returnAlternateLanguages, returnCanonical } from "@/lib/utils";
import { MessageSquare } from "lucide-react";
import { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

export const dynamic = "force-static";
export const revalidate = 2592000;

const { PREVIEW } = PAGES_ROUTES.CONTACT;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const t = await getTranslations("Metadata.contact");
  const title = t("title");
  const description = t("description");
  const ogTitle = t("ogTitle");
  const ogDescription = t("ogDescription");
  const keywords = [title, ogTitle];

  return {
    title,
    description,
    alternates: {
      canonical: returnCanonical(locale, PREVIEW),
      languages: returnAlternateLanguages(PREVIEW),
    },
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      images: [{ url:"/hero-bg.webp" }],
    },
    keywords,
  };
}
export default async function page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("ContactPage");
  return (
    <div className="min-h-full">
      <Title
        type="with_icon"
        title={t("hero.title")}
        description={t("hero.description")}
        Icon={<MessageSquare />}
      />
      <div
        data-component="contact-form"
        className="mt-10 max-w-[600px] mx-auto bg-white shadow rounded-xl p-8"
      >
        <form className="w-full flex flex-col gap-5">
          <label htmlFor="name" className="block font-medium">
            {t("form.name.label")}
            <Input
              type="name"
              id="name"
              name="client name"
              placeholder={t("form.name.placeholder")}
              title={t("form.name.label")}
              className="mt-2"
            />
          </label>
          <label htmlFor="email" className="block font-medium">
            {t("form.email.label")}
            <Input
              type="email"
              id="email"
              name="client email"
              placeholder={t("form.email.placeholder")}
              title={t("form.email.label")}
              className="mt-2"
            />
          </label>
          <label htmlFor="message" className="block font-medium">
            {t("form.message.label")}
            <Textarea
              id="message"
              name="client message"
              placeholder={t("form.message.placeholder")}
              title={t("form.message.label")}
              className="min-h-40 mt-2"
            />
          </label>
          <Button type="submit" className="w-full" size="lg">
            {t("form.submit")}
          </Button>
        </form>
      </div>
    </div>
  );
}
