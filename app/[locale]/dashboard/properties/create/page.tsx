import CreatePropertyWithImagesFormView from '@/features/properties/views/mutation-views/create-property-with-images-form-view';
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
  title: "Create Property",
  description: "Create Property page",
};
export default function page() {
  return (
    <div>
      <CreatePropertyWithImagesFormView />
    </div>
  )
}
