import CreatePropertyWithImagesFormView from '@/features/properties/views/mutation-views/create-property-with-images-form-view';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("resources.property")
  return {
    title: t("create"),
  };
}
export default function page() {
  return (
    <div>
      <CreatePropertyWithImagesFormView />
    </div>
  )
}
