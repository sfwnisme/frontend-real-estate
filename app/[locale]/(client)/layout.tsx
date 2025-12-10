import FooterView from '@/features/client/footer-view'
import NavView from '@/features/client/nav-view'
import React from 'react'

export default function layout({ children }: { children: React.ReactNode }) {
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
