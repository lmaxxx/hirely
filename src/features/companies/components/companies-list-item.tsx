import {TableCell, TableRow} from "@/components/ui/table.tsx";
import EditCompanyFormSheet from "@/features/companies/components/edit-company-form-sheet.tsx";
import DeleteCompanyDialog from "@/features/companies/components/delete-company-dialog.tsx";
import {CompanyWithApplicationCount} from "@/entities.type.ts";

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
        <DeleteCompanyDialog onDelete={onDelete.bind(null, company.id)} companyName={company.name}/>
      </TableCell>
    </TableRow>
  )
}