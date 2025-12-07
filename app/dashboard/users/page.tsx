import { Button } from "@/components/ui/button";
import { PAGES_ROUTES } from "@/constants/config";
import UsersTableSkeleton from "@/features/users/skeletons/users-table-skeleton";
import UsersTableView from "@/features/users/views/users-table-view";
import { SearchParamsType } from "@/types/types";
import Link from "next/link";
import React, { Suspense } from "react";
type Props = {
  searchParams: SearchParamsType;
};
const { CREATE } = PAGES_ROUTES.USERS;
export default async function page({ searchParams }: Props) {
  const searchParamsRes = await searchParams;
  return (
    <div className="w-full">
    <div className="inline-flex justify-between w-full mb-12">
      <h1 className="scroll-m-20 text-center text-4xl font-medium tracking-tight text-balance">
        Users
      </h1>
      <Button asChild>
        <Link href={CREATE}>Create user</Link>
      </Button>
    </div>
    <Suspense fallback={<UsersTableSkeleton count={10} />}>
      <UsersTableView searchParams={searchParamsRes} />
    </Suspense>
    </div>
  );
}
