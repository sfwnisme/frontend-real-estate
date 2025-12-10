import FaqView from "@/features/client/faq-view";
import ServicesView from "@/features/client/services-view";
import BlogPostsHomePageView from "@/features/blog-posts/views/blog-posts-home-page-view";
import HeroView from "@/features/client/hero-view";
import PropertiesHomePageView from "@/features/properties/views/properties-home-page-view";

export default async function Home() {
  return (
    <div className="min-h-screen">
      <HeroView />
      <div className="responsive grid gap-16 md:gap-40 mt-40">
        <PropertiesHomePageView />
        <BlogPostsHomePageView />
        <FaqView />
        <ServicesView />
      </div>
    </div>
  );
}
