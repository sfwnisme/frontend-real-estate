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
import Link from "next/link";
import { notFound } from "next/navigation";
import { ButtonGroup } from "@/components/ui/button-group";
import { modalQuery } from "@/lib/utils";
import { PAGES_ROUTES } from "@/constants/config";
import { getUsers } from "../lib/actions";
import { USER_ROLES_READABLE } from "@/constants/enums";
import { Badge } from "@/components/ui/badge";
import { getCurrentUser } from "@/lib/actions";
import can from "@/features/dashboard/auth/can";
import { Visible } from "@sfwnisme/visi";
import { getLocale, getTranslations } from "next-intl/server";
type Props = {
  currentPage?: number;
  searchParams: { [key: string]: string | undefined };
};


export default async function UsersTableView({
  currentPage,
  searchParams,
}: Props) {
  const locale = await getLocale();
  const tTable = await getTranslations("common.table.headers")
  const tActions = await getTranslations("common.actions")
  const tMessages = await getTranslations("common.messages")
  const users = await getUsers();
  const usersData = users.data;
  if (!usersData) {
    return notFound();
  }

  const canDeleteUser = await can("user.delete");
  const canUpdateUser = await can("user.update");

  const currentUser = await getCurrentUser();
  return (
    <div className="w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-start">{tTable('name')}</TableHead>
            <TableHead className="text-start">{tTable('email')}</TableHead>
            <TableHead className="text-start">{tTable('role')}</TableHead>
            <TableHead className="text-start w-20">{tTable('actions')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {usersData.map((user) => (
            <TableRow key={user._id}>
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell className="text-start">{user.email}</TableCell>
              <TableCell className="text-start">
                <Badge variant="secondary">
                  {USER_ROLES_READABLE[user.role]}
                </Badge>
              </TableCell>
              <TableCell className="text-end w-fit">
                <div className="inline-flex items-center gap-2">
                  <ButtonGroup orientation={locale === "en" ? "horizontal" : "horizontalAr"}>
                    <Button variant="outline" size="sm">
                      <Link href={`${PAGES_ROUTES.USERS.PREVIEW}/${user._id}`}>
                        {tActions('open')}
                      </Link>
                    </Button>
                    <Visible when={canUpdateUser}>
                      <Button variant="outline" size="sm">
                        <Link href={`${PAGES_ROUTES.USERS.UPDATE}/${user._id}`}>
                          <Pencil />
                        </Link>
                      </Button>
                    </Visible>
                  </ButtonGroup>
                  <Visible when={canDeleteUser}>
                    <Link
                      href={
                        currentUser.data?._id !== user._id
                          ? modalQuery("delete", "user", user._id, searchParams)
                          : ""
                      }
                      prefetch={true}
                    >
                      <Button
                        variant="secondary"
                        size="sm"
                        disabled={currentUser.data?._id === user._id}
                        title={
                          currentUser.data?._id === user._id
                            ? tMessages('youCannotDeleteYourself')
                            : ""
                        }
                      >
                        <Trash />
                      </Button>
                    </Link>
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
