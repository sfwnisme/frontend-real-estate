import React from 'react'
import Title from '../../components/custom/title'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { Button } from '../../components/ui/button'
import Image from 'next/image'
import { getTranslations } from 'next-intl/server'

type Props = {}

export default async function FooterView({ }: Props) {
  const t =await getTranslations("HomePage.Footer")

  const currentYear = new Date().getFullYear()
  return (
    <footer className='bg-blue-50 relative px-4 min-h-[80dvh] flex'>
      <div data-component="footer-bg-image" className='size-full absolute bottom-0 left-1/2 -translate-x-1/2 z-0'>
        <Image src="/footer-bg.webp" width="2000" height="1200" alt='footer background' className='size-full object-cover' />
      </div>
      <div className='absolute bottom-0 left-0 w-full h-[80vh] lg:h-[40dvh] bg-linear-to-t from-gray-50 to-transparent' />
      <div className='responsive py-10 lg:py-20 relative flex flex-col md:flex-row md:flex-wrap justify-between gap-10 h-auto'>
        <div className='max-w-[400px]'>
          <Title type='start' title={t("title")} />
          <div className='mt-4 inline-flex gap-4 items-center w-full'>
            <Input type="email" placeholder={t("placeholder")} className='bg-white border-0' />
            <Button>{t("button")}</Button>
          </div>
        </div>
        <div data-component="quick-links-block" className='min-w-[200px] max-md:flex-1'>
          <h3 className='text-xl font-semibold mb-4'>{t("QuickLinks.title")}</h3>
          <ul>
            {t.raw("QuickLinks.links").map((link: string) => (
              <li key={link}><Link href="#" className='size-full block py-1'>{link}</Link></li>
            ))}
          </ul>
        </div>
        <div data-component="footer-tail" className='relative flex flex-wrap gap-4 items-end justify-between w-full '>
          <p>@{currentYear} {t("copyright")}</p>
          <ul className='flex items-center gap-8'>
            {t.raw("Others").map((link: string) => (
              <li key={link}><Link href="#" className='size-full block py-1'>{link}</Link></li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}