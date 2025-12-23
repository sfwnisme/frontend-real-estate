import { Button } from "@/components/ui/button";
import { PAGES_ROUTES } from "@/constants/config";
import can from "@/features/dashboard/auth/can";
import UsersTableSkeleton from "@/features/users/skeletons/users-table-skeleton";
import UsersTableView from "@/features/users/views/users-table-view";
import { SearchParamsType } from "@/types/types";
import { Visible } from "@sfwnisme/visi";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import React, { Suspense } from "react";
type Props = {
  searchParams: SearchParamsType;
};
const { CREATE } = PAGES_ROUTES.USERS;
export default async function page({ searchParams }: Props) {
  const t = await getTranslations("resources.user")
  const canCreateUser = await can("user.write");

  const searchParamsRes = await searchParams;
  return (
    <div className="w-full">
      <div className="inline-flex justify-between w-full mb-12">
        <h1 className="scroll-m-20 text-center text-4xl font-medium tracking-tight text-balance">
          {t("plural")}
        </h1>
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
