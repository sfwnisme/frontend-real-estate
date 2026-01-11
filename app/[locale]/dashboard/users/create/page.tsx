import CreateUserFormView from '@/features/users/views/mutation-views/create-user-form-view';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("resources.user")
  return {
    title: t("create"),
  }
}
export default function page() {
  return (
    <div>
      <CreateUserFormView />
    </div>
  );
}
