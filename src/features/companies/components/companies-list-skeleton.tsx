import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {Skeleton} from "@/components/ui/skeleton.tsx";

export default function CompaniesListSkeleton() {
  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <Skeleton className={"w-16 h-5"} />
            </TableHead>
            <TableHead>
              <Skeleton className={"w-28 h-5"} />
            </TableHead>
            <TableHead>
              <Skeleton className={"w-28 h-5"} />
            </TableHead>
            <TableHead>
              <Skeleton className={"w-24 h-5"} />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow >
            <TableCell>
              <Skeleton className={"w-32 h-5 my-1"} />
            </TableCell>
            <TableCell>
              <Skeleton className={"w-5 h-5 my-1"} />
            </TableCell>
            <TableCell>
              <Skeleton className={"w-40 h-5 my-1"} />
            </TableCell>
            <TableCell>
              <Skeleton className={"w-12 h-5 my-1"}/>
            </TableCell>
          </TableRow>
          <TableRow >
            <TableCell>
              <Skeleton className={"w-12 h-5 my-1"} />
            </TableCell>
            <TableCell>
              <Skeleton className={"w-5 h-5 my-1"} />
            </TableCell>
            <TableCell>
              <Skeleton className={"w-40 h-5 my-1"} />
            </TableCell>
            <TableCell>
              <Skeleton className={"w-12 h-5 my-1"} />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Skeleton className={"w-24 h-5 my-1"} />
            </TableCell>
            <TableCell>
              <Skeleton className={"w-5 h-5 my-1"} />
            </TableCell>
            <TableCell>
              <Skeleton className={"w-40 h-5 my-1"} />
            </TableCell>
            <TableCell>
              <Skeleton className={"w-12 h-5 my-1"} />
            </TableCell>
          </TableRow>
          <TableRow >
            <TableCell>
              <Skeleton className={"w-24 h-5 my-1"} />
            </TableCell>
            <TableCell>
              <Skeleton className={"w-5 h-5 my-1"} />
            </TableCell>
            <TableCell>
              <Skeleton className={"w-40 h-5 my-1"} />
            </TableCell>
            <TableCell>
              <Skeleton className={"w-12 h-5 my-1"} />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}