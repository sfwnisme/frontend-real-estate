import CreateBlogPostFormView from '@/features/blog-posts/views/mutation-views/create-blog-post-form-view'
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("resources.blogPost")
  return {
    title: t("create"),
  }
}
export default function page() {
  return (
    <div>
      <CreateBlogPostFormView />
    </div>
  )
}
