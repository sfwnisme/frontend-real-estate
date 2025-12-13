import FooterView from '@/features/client/footer-view'
import NavView from '@/features/client/nav-view'
import React from 'react'
import { setRequestLocale } from 'next-intl/server'

export default async  function layout({ children, params }: { children: React.ReactNode, params: Promise<{locale: string}> }) {
  const locale = (await params).locale;
  setRequestLocale(locale);
  return (
    <div data-component="pages-layout" className='bg-gray-50'>
      <NavView />
      <div className='px-4 mb-20'>
        {children}
      </div>
      <FooterView />
    </div>
  )
}
