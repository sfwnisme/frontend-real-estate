import Title from "../../components/custom/title";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/ui/accordion";
import { ChevronDown } from "lucide-react";
import { getTranslations } from "next-intl/server";

type Props = {};

export default async function Faq({}: Props) {
  const t = await getTranslations("HomePage.FaqSection");

  return (
    <div className="flex max-lg:flex-col items-start gap-8 lg:gap-16 justify-between">
      <div className="lg:min-w-[400px] w-full flex-1">
        <Title type="start" title={t("title")} description={t("description")} />
      </div>
      <div className="w-full">
        <Accordion
          type="single"
          collapsible
          className="w-full"
          defaultValue="item-1"
        >
          {t
            .raw("Questions")
            .map((faq: { question: string; answer: string }) => (
              <AccordionItem
                value={String(faq.question)}
                key={faq.question}
                className="border-gray-100"
              >
                <AccordionTrigger>
                  {faq.question}
                  <ChevronDown
                    strokeWidth="1"
                    className="border border-gray-200 rounded-full "
                  />
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 text-balance">
                  <p>{faq.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
        </Accordion>
      </div>
    </div>
  );
}
