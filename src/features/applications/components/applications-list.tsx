import {Table, TableBody, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {JoinedApplicationCompany} from "@/entities.type.ts";
import {Frown} from "lucide-react";
import ApplicationsListItem from "@/features/applications/components/applications-list-item.tsx";

type Props = {
  applications: JoinedApplicationCompany[];
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
              <ApplicationsListItem key={application.id} application={application}/>
            ))
          }
        </TableBody>
      </Table>
    </div>
  )
}