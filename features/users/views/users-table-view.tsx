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
import { getUsers } from "../lib/requests";
import { USER_ROLES_READABLE } from "@/constants/enums";
import { Badge } from "@/components/ui/badge";
import { getCurrentUser } from "@/lib/requests";

type Props = {
  currentPage?: number;
  searchParams: { [key: string]: string | undefined };
};

// const isNotCurrentUser = async (id: string) => {
//   const currentUser = await getCurrentUser();
//   if(!currentUser.data) return false;
//   if(currentUser.data._id === id) return false;
//   return true
// }

export default async function UsersTableView({
  currentPage,
  searchParams,
}: Props) {
  const users = await getUsers();
  console.log(users);
  const usersData = users.data;
  if (!usersData) {
    return notFound();
  }

  const currentUser = await getCurrentUser();
  return (
    <div className="overflow-x-scroll w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead className="text-start">Email</TableHead>
            <TableHead className="text-start">Role</TableHead>
            <TableHead className="text-start w-20">Actions</TableHead>
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
                  <ButtonGroup>
                    <Button variant="outline" size="sm">
                      <Link href={`${PAGES_ROUTES.USERS.PREVIEW}/${user._id}`}>
                        Open
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm">
                      <Link href={`${PAGES_ROUTES.USERS.UPDATE}/${user._id}`}>
                        <Pencil />
                      </Link>
                    </Button>
                  </ButtonGroup>
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
                      title={currentUser.data?._id === user._id ? "You cannot delete yourself" : ""}
                    >
                      <Trash />
                    </Button>
                  </Link>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
