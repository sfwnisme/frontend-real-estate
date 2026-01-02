import { useTransition } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  UpdateBlogPostSchema,
  UpdateBlogPostType,
} from "../schema/blog-post-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { BLOG_POST_STATUS } from "@/constants/enums";
import {
  updateBlogPost,
} from "../lib/actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { BlogPost } from "@/types/types";

export default function useUpdateBlogPostFormValidation(blogPost: BlogPost) {
  const [isPending, startTransition] = useTransition();
  const {_id,title, excerpt, content, status, meta} = blogPost;
  const form = useForm<UpdateBlogPostType>({
    resolver: zodResolver(UpdateBlogPostSchema),
    defaultValues: {
      title,
      excerpt,
      content,
      status: BLOG_POST_STATUS.DRAFT,
      meta: {
        title: meta.title,
        description: meta.description,
        keywords: meta.keywords.join(","),
      },
    },
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<UpdateBlogPostType> = async (data) => {
    startTransition(async () => {
      const updateBlogPostRes = await updateBlogPost(data, _id);
      if (!updateBlogPostRes.data) {
        form.setError("root", {
          type: "root error",
          message: updateBlogPostRes.msg,
        });
        console.log(updateBlogPostRes);
        const msg = updateBlogPostRes.msg;
        form.setError(msg.path, { type: msg.type, message: msg.msg });
        toast.error(msg.msg);
        return;
      }
      toast.success(updateBlogPostRes.msg);
    });
  };
  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    isPending,
  };
}
