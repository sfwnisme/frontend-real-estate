"use client"
import React, { useState } from 'react'
import Title from '../../components/custom/title'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../../components/ui/accordion'
import { servicesDummyData } from '@/data/dummyData'
import ImageCard from '../../components/custom/ImageCard'
import { useTranslations } from 'next-intl'

type Props = {}

export default function ServicesView({ }: Props) {
  const t = useTranslations('HomePage.ServicesSection')
  const [imgPreview, setimgPreview] = useState("/blog/blog01.webp")
  return (
    <div className="bg-gray-50">
      <div className=' flex flex-nowrap max-lg:flex-col items-start justify-between gap-8 lg:gap-20 h-full'>
        <div className='w-full h-full flex flex-col justify-between'>
          <div className='mb-8'>
          <Title type="with_badge" title={t("title")} description={t("description")} badge={t("badge")} />
          </div>
          <div className='w-full'>
            <Accordion
              type="single"
              collapsible
              className="w-full"
              defaultValue="item-1"
            >
              {t.raw("ServicesList").map((service: Record<string, string>) => (
                <AccordionItem value={String(service.title)} key={service.title} className='border-gray-200' onClick={() => setimgPreview(service.image)}>
                  <AccordionTrigger>{service.title}</AccordionTrigger>
                  <AccordionContent className="flex flex-col gap-4 text-balance">
                    <p>{service.description}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
        <div className='max-lg:w-full shrink-0'>
          <ImageCard image={imgPreview} />
        </div>
      </div>
    </div>
  )
}