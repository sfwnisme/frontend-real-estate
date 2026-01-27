import { BreadcrumbLayout } from '@/components/custom/breadcrumb-layout'
import React from 'react'

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div data-component="pages-layout">
      <BreadcrumbLayout />
      <div className='responsive py-20'>
        {children}
      </div>
    </div>
  )
}
