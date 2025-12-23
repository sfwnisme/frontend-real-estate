import { BlogPost, ImageType } from "@/types/types";
import React, { useMemo } from "react";
import UpdateBlogPostFormView from "./update-blog-post-form-view";
import CreateNewBlogPostImageFormView from "./create-new-blog-post-image-form-view";
import UpdateBlogPostSlugFormView from "./update-blog-post-slug-form-view";

type Props = {
  blogPost: BlogPost;
  image: ImageType | null;
};

export default function UpdateBlogPostView(props: Props) {
  const { blogPost, image } = props;

  const stableBlogPost = useMemo(
    () => blogPost,
    [blogPost._id, blogPost.slug, blogPost.title]
  );
  const stableImage = useMemo(() => image, [image?._id, image?.url]);

  return (
    <div className="grid lg:grid-cols-5 gap-4">
      <div className="col-span-3">
        <UpdateBlogPostFormView blogPost={stableBlogPost} />
      </div>
      <div className="col-span-2 flex flex-col gap-4 h-full">
        <UpdateBlogPostSlugFormView blogPost={stableBlogPost} />
        <CreateNewBlogPostImageFormView
          blogPostId={stableBlogPost._id}
          image={stableImage}
        />
      </div>
    </div>
  );
}
