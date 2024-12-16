import {TableCell, TableRow} from "@/components/ui/table.tsx";
import ApplicationContextMenu from "@/features/applications/components/application-context-menu.tsx";
import {JoinedApplicationCompany} from "@/entities.type.ts";
import {useNavigate} from "react-router";
import PublishStatusBadge from "@/components/publish-status-badge.tsx";

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
          <PublishStatusBadge
            isPublished={!!application.published_at}
            className={"text-xs"}
          />
        </TableCell>
        <TableCell className="text-right">
          {new Date(application.modified_at).toLocaleString()}
        </TableCell>
      </TableRow>
    </ApplicationContextMenu>
  )
}