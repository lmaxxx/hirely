import {TableCell, TableRow} from "@/components/ui/table.tsx";
import EditCompanyFormSheet from "@/features/companies/components/edit-company-form-sheet.tsx";
import {CompanyWithApplicationCount} from "@/entities.type.ts";
import {Button} from "@/components/ui/button.tsx";
import DeleteWithConfirmationDialog from "@/components/delete-with-confirmation-dialog.tsx";

type Props = {
  company: CompanyWithApplicationCount
  onDelete: (id: number) => void;
  onUpdate: (company: CompanyWithApplicationCount) => void;
}

export default function CompaniesListItem({company, onUpdate, onDelete}: Props) {
  return (
    <TableRow key={company.id} className={"h-12"}>
      <TableCell className="font-medium">{company.name}</TableCell>
      <TableCell>{company.application[0].count}</TableCell>
      <TableCell>{new Date(company.modified_at).toLocaleString()}</TableCell>
      <TableCell className="text-right">
        <EditCompanyFormSheet onUpdate={onUpdate} company={company}/>
        <DeleteWithConfirmationDialog
          requiredString={company.name}
          description={"This action cannot be undone. This will permanently delete" +
            " $$$ and remove all applications linked with this company."}
          onDelete={onDelete.bind(null, company.id)}
        >
          <Button
            variant="ghost"
            size="sm"
            className="text-destructive hover:text-destructive"
          >Delete</Button>
        </DeleteWithConfirmationDialog>
      </TableCell>
    </TableRow>
  )
}