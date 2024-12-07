import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {Application, Company} from "@/entities.type.ts";
import {Frown} from "lucide-react";
import DeleteCompanyDialog from "@/features/companies/components/delete-company-dialog.tsx";
import EditCompanyFormSheet from "@/features/companies/components/edit-company-form-sheet.tsx";
import {Badge} from "@/components/ui/badge.tsx";

type Props = {
  applications: Application[];
  // onDelete: (id: number) => void;
  // onUpdate: (company: Company) => void;
}

export default function ApplicationsList({applications}: Props) {
  if (!applications.length) {
    return (
      <div className={"mt-[25vh] text-xl"}>
        <h1 className={"text-zinc-500 mb-2 text-center"}>You don't have applications for now</h1>
        <Frown className={"text-zinc-500 mx-auto"}/>
      </div>
    )
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Position</TableHead>
            <TableHead>Submissions</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Last Modified</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            applications.map((application) => (
              <TableRow key={application.id} className={"h-12 cursor-pointer"}>
                <TableCell className="font-medium">{application.position}</TableCell>
                <TableCell>0</TableCell>
                <TableCell>{"Google"}</TableCell>
                <TableCell>
                  <Badge className={"bg-red-500 hover:bg-red-600"}>Not published</Badge>
                </TableCell>
                <TableCell className="text-right">
                  {new Date(application.modified_at).toLocaleString()}
                </TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </div>
  )
}