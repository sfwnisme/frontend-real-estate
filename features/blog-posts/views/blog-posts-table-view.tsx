import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pencil, Trash } from "lucide-react";
import { Link as NextIntlLink } from "@/i18n/navigation"
import { notFound } from "next/navigation";
import { getBlogPosts } from "@/lib/requests";
import { ButtonGroup } from "@/components/ui/button-group";
import { PAGINATION_CONFIG } from "@/constants/enums";
import { formatDate, modalQuery } from "@/lib/utils";
import { PAGES_ROUTES } from "@/constants/config";
import can from "@/features/dashboard/auth/can";
import { Visible } from "@sfwnisme/visi";
import { getLocale, getTranslations } from "next-intl/server";

type Props = {
  currentPage: number;
  searchParams: { [key: string]: string | undefined };
};

export default async function BlogPostsTableView({
  currentPage,
  searchParams,
}: Props) {
  const blogPosts = await getBlogPosts(
    PAGINATION_CONFIG.BLOG.DASHBOARD,
    currentPage
  );
  const locale = await getLocale();
  const tTable = await getTranslations("common.table.headers")
  const tActions = await getTranslations("common.actions")
  const tMessages = await getTranslations("common.messages")
  const blogPostsData = blogPosts.data?.data;
  if (!blogPostsData || blogPostsData?.length === 0) {
    return notFound();
  }
  const canDeleteBlogPost = await can("blogpost.delete");
  const canEditBlogPost = await can("blogpost.update");
  return (
    <div className="w-full">
      <Table className="rounded-lg overflow-hidden">
        <TableHeader className="bg-secondary">
          <TableRow>
            <TableHead className="text-start">{tTable('title')}</TableHead>
            <TableHead className="text-start">{tTable('creationDate')}</TableHead>
            <TableHead className="text-start">{tTable('lastModification')}</TableHead>
            <TableHead className="text-start">{tTable('publishedDate')}</TableHead>
            <TableHead className="text-start w-20">{tTable('actions')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {blogPostsData.map((blogPost) => (
            <TableRow key={blogPost._id}>
              <TableCell className="font-medium">{blogPost.title}</TableCell>
              <TableCell className="text-start">
                {formatDate(blogPost.createdAt)}
              </TableCell>
              <TableCell className="text-start">
                {formatDate(blogPost.updatedAt)}
              </TableCell>
              <TableCell className="text-start">
                {formatDate(blogPost.publishedAt, tMessages('notPublished'))}
              </TableCell>
              <TableCell className="text-end w-fit">
                <div className="inline-flex items-center gap-2">
                  <ButtonGroup orientation={locale === "en" ? "horizontal" : "horizontalAr"}>
                    <Button variant="outline" size="sm">
                      <NextIntlLink
                        href={`${PAGES_ROUTES.BLOG_POSTS.PREVIEW}/${blogPost.slug}`}
                      >
                        {tActions('open')}
                      </NextIntlLink>
                    </Button>
                    <Visible when={canEditBlogPost}>
                      <Button variant="outline" size="sm">
                        <NextIntlLink
                          href={`${PAGES_ROUTES.BLOG_POSTS.UPDATE}/${blogPost.slug}`}
                        >
                          <Pencil />
                        </NextIntlLink>
                      </Button>
                    </Visible>
                  </ButtonGroup>
                  <Visible when={canDeleteBlogPost}>
                    <NextIntlLink
                      href={modalQuery(
                        "delete",
                        "blog",
                        blogPost._id,
                        searchParams
                      )}
                      prefetch={true}
                    >
                      <Button variant="secondary" size="sm">
                        <Trash />
                      </Button>
                    </NextIntlLink>
                  </Visible>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
