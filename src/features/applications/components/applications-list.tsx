import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {JoinedApplicationCompany} from "@/entities.type.ts";
import {Frown} from "lucide-react";
import {Badge} from "@/components/ui/badge.tsx";
import {useNavigate} from "react-router";
import ApplicationContextMenu from "@/features/applications/components/application-context-menu.tsx";

type Props = {
  applications: JoinedApplicationCompany[];
}

export default function ApplicationsList({applications}: Props) {
  const navigate = useNavigate();

  const redirectToDashboard = (id: number) => {
    navigate(`/dashboard/${id}`);
  }

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
              <ApplicationContextMenu>
                <TableRow onClick={() => redirectToDashboard(application.id)} key={application.id} className={"h-12 cursor-pointer relative"}>
                  <TableCell className="font-medium">{application.position}</TableCell>
                  <TableCell>0</TableCell>
                  <TableCell>{application.company.name ?? "ERROR"}</TableCell>
                  <TableCell>
                    <Badge className={"bg-red-500 hover:bg-red-600"}>Not published</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {new Date(application.modified_at).toLocaleString()}
                  </TableCell>
                </TableRow>
              </ApplicationContextMenu>
            ))
          }
        </TableBody>
      </Table>
    </div>
  )
}