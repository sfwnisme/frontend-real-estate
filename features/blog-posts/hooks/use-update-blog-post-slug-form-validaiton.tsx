"use client";
import { useTransition } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "sonner";
import { STATUS_TEXT } from "@/constants/enums";
import {
  UpdateBlogPostSlugType,
  UpdateBlogPostSlugSchema,
} from "../schema/blog-post-schema";
import { useRouter } from "next/navigation";
import { PAGES_ROUTES } from "@/constants/config";
import { updateBlogPostSlug } from "../lib/actions";

export default function useUpdateBlogPostSlugFormValidation(
  blogPostId: string,
  slug: string
) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const slugToText = slug
  .split('-')
  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
  .join(' ');

  const form = useForm<UpdateBlogPostSlugType>({
    resolver: zodResolver(UpdateBlogPostSlugSchema),
    defaultValues: {
      slug: slugToText,
    },
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<UpdateBlogPostSlugType> = (values) => {
    startTransition(async () => {
      try {
        console.log("blog post update data: ", {
          values,
          blogPostId: blogPostId,
        });
        const updatedBlogPostSlugRes = await updateBlogPostSlug(
          blogPostId,
          values.slug
        );
        console.log("update blog post slug", updatedBlogPostSlugRes);
        if (updatedBlogPostSlugRes.statusText !== STATUS_TEXT.SUCCESS) {
          form.setError("slug", { message: updatedBlogPostSlugRes.msg.msg });
          toast.error(
            typeof updatedBlogPostSlugRes.msg === "string"
              ? updatedBlogPostSlugRes.msg
              : updatedBlogPostSlugRes.msg?.msg 
          );
          return;
        }
        toast.success(updatedBlogPostSlugRes.msg);
        router.push(
          PAGES_ROUTES.BLOG_POSTS.UPDATE +
            "/" +
            updatedBlogPostSlugRes?.data?.slug
        );
      } catch (error) {
        console.error("Error updating blog post slug:", error);
      }
    });
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    isPending,
  };
}
