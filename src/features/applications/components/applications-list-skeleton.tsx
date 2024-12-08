import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {Skeleton} from "@/components/ui/skeleton.tsx";

export default function ApplicationsListSkeleton() {
  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <Skeleton className={"w-16 h-5"} />
            </TableHead>
            <TableHead>
              <Skeleton className={"w-24 h-5"} />
            </TableHead>
            <TableHead>
              <Skeleton className={"w-20 h-5"} />
            </TableHead>
            <TableHead>
              <Skeleton className={"w-16 h-5"} />
            </TableHead>
            <TableHead className={"flex items-center justify-end"}>
              <Skeleton className={"w-28 h-5"} />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            Array.from({length: 4}).map((_, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Skeleton className={"w-32 h-5 my-1"} />
                </TableCell>
                <TableCell>
                  <Skeleton className={"w-12 h-5 my-1"} />
                </TableCell>
                <TableCell>
                  <Skeleton className={"w-28 h-5 my-1"} />
                </TableCell>
                <TableCell>
                  <Skeleton className={"w-28 h-5 my-1"} />
                </TableCell>
                <TableCell className={"flex items-center justify-end"}>
                  <Skeleton className={"w-40 h-5 my-1"} />
                </TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </div>
  )
}