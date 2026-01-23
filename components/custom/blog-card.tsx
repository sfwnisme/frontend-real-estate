import { PAGES_ROUTES } from "@/constants/config";
import { getBlogPostImage } from "@/lib/requests";
import { BlogPost } from "@/types/types";
import Image from "next/image";
import { Link as NextIntlLink } from "@/i18n/navigation";

export default async function BlogCard({ blogPost }: { blogPost: BlogPost }) {
  const blogPostImage = await getBlogPostImage(blogPost?._id);

  const blogPostImageData = blogPostImage.data;
  return (
    <NextIntlLink
      href={PAGES_ROUTES.BLOG_POSTS.PREVIEW + "/" + blogPost.slug}
      className="group/blogCard relative overflow-hidden rounded-2xl cursor-pointer size-full max-h-[300px]"
    >
      {blogPostImageData?.url && (
        <Image
          src={blogPostImageData.url}
          width={blogPostImageData.dimensions?.width || 400}
          height={blogPostImageData.dimensions?.height || 400}
          alt={blogPost.title}
          className="object-cover size-full aspect-square"
        />
      )}
      <div className="absolute bg-primary/20 left-0 bottom-0 xl:-bottom-full group-hover/blogCard:bottom-0 duration-500 group-hover/blogCard:duration-500 backdrop-blur-2xl w-full p-4 text-white">
        {blogPost.title}
      </div>
    </NextIntlLink>
  );
}
