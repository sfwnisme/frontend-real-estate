
import { Skeleton } from "@/components/ui/skeleton"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function UsersTableSkeleton({count}: {count: number}) {
  const countArray = Array.from({length: count})
  return (
    <div>
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
          {countArray.map((_,idx) => (
            <TableRow key={idx}>
              <TableCell className="font-medium"><Skeleton className="h-5 w-full" /></TableCell>
              <TableCell><Skeleton className="h-5 w-full" /></TableCell>
              <TableCell className="flex"><Skeleton className="h-5 w-full" /></TableCell>
              <TableCell className="text-end w-fit">
                <div className="inline-flex gap-2 items-center justify-end">
                  <Skeleton className="h-5 w-16" />
                  <Skeleton className="h-5 w-8" />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}