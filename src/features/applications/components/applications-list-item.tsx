import {TableCell, TableRow} from "@/components/ui/table.tsx";
import {Badge} from "@/components/ui/badge.tsx";
import ApplicationContextMenu from "@/features/applications/components/application-context-menu.tsx";
import {JoinedApplicationCompany} from "@/entities.type.ts";
import {useNavigate} from "react-router";

type Props = {
  application: JoinedApplicationCompany;
}

export default function ApplicationsListItem({application}: Props) {
  const navigate = useNavigate();

  const redirectToDashboard = (id: number) => {
    navigate(`/dashboard/${id}`);
  }

  return (
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
  )
}