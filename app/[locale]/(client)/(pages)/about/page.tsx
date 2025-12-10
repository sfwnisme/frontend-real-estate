import Title from "@/components/custom/title";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqsDummyData } from "@/data/dummyData";
import { ChevronDown, Home } from "lucide-react";
import Image from "next/image";
import React from "react";

export default function page() {
  return (
    <div className="flex flex-col gap-20">
      <div>
        <Title
          title="Your New Home Awaits"
          description="Discover a curated selection of properties designed to suit every lifestyle, from cozy family homes to luxurious retreats."
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
          title="We’re not just about finding you a house; we’re here to help you find your home."
          badge="Why Work With Us?"
        />
        <div className="grid md:grid-cols-4 gap-4">
          <div className="flex flex-col gap-2 text-start p-8">
            <h2 className="text-2xl font-semibold">150+</h2>
            <p>Homes matched with happy owners</p>
          </div>
          <div className="flex flex-col gap-2 text-start p-8">
            <h2 className="text-2xl font-semibold">2,000+</h2>
            <p>Clients guided every step of the way</p>
          </div>
          <div className="md:col-span-2">
            <p className="text-base p-8">
              From modern family homes to breathtaking luxury escapes, find the
              perfect match for your lifestyle.
            </p>
          </div>
        </div>
      </div>
      <div>
        <Title
          type="with_icon"
          title="Need Help?"
          description="Buying a home doesn’t have to be overwhelming. Our FAQ section has answers to all your questions, so you can move forward with confidence."
          Icon={Home}
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
          title="Frequently asked questions."
          description="We're here to make your real estate journey seamless and stress-free"
        />
        <div className="w-full rounded-2xl overflow-hidden">
          <Accordion
            type="single"
            collapsible
            className="w-full"
            defaultValue="item-1"
          >
            {faqsDummyData.map((faq) => (
              <AccordionItem
                value={String(faq.id)}
                key={faq.id}
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
