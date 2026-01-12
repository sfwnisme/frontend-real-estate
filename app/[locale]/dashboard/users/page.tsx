import { Button } from "@/components/ui/button";
import { PAGES_ROUTES } from "@/constants/config";
import can from "@/features/dashboard/auth/can";
import UsersTableSkeleton from "@/features/users/skeletons/users-table-skeleton";
import UsersTableView from "@/features/users/views/users-table-view";
import { SearchParamsType } from "@/types/types";
import { Visible } from "@sfwnisme/visi";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { Suspense } from "react";
import { Typography } from "@/components/custom/typography";
type Props = {
  searchParams: SearchParamsType;
};
const { CREATE } = PAGES_ROUTES.USERS;

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("resources.user");
  return {
    title: t("plural"),
  };
}

export default async function page({ searchParams }: Props) {
  const t = await getTranslations("resources.user");
  const canCreateUser = await can("user.write");

  const searchParamsRes = await searchParams;
  return (
    <div className="w-full">
      <div className="inline-flex justify-between w-full mb-12">
        <Typography as="h1" variant="h4">
          {t("plural")}
        </Typography>
        <Visible when={canCreateUser}>
          <Button asChild>
            <Link href={CREATE}>{t("create")}</Link>
          </Button>
        </Visible>
      </div>
      <Suspense fallback={<UsersTableSkeleton count={10} />}>
        <UsersTableView searchParams={searchParamsRes} />
      </Suspense>
    </div>
  );
}
