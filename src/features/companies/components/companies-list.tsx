import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {Company} from "@/entities.type.ts";
import {Frown} from "lucide-react";
import DeleteCompanyDialog from "@/features/companies/components/delete-company-dialog.tsx";
import EditCompanyFormSheet from "@/features/companies/components/edit-company-form-sheet.tsx";

type Props = {
  companies: Company[];
  onDelete: (id: number) => void;
  onUpdate: (company: Company) => void;
}

//TODO connect applications to companies
export default function CompaniesList({companies, onDelete, onUpdate}: Props) {

  if (!companies.length) {
    return (
      <div className={"mt-[25vh] text-xl"}>
        <h1 className={"text-zinc-500 mb-2 text-center"}>You don't have companies for now</h1>
        <Frown className={"text-zinc-500 mx-auto"}/>
      </div>
    )
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Applications</TableHead>
            <TableHead>Last Modified</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            companies.map((company) => (
              <TableRow key={company.id} className={"h-12"}>
                <TableCell className="font-medium">{company.name}</TableCell>
                <TableCell>0</TableCell>
                <TableCell>{new Date(company.modified_at).toLocaleString()}</TableCell>
                <TableCell className="text-right">
                  <EditCompanyFormSheet onUpdate={onUpdate} company={company}/>
                  <DeleteCompanyDialog onDelete={onDelete.bind(null, company.id)} companyName={company.name}/>
                </TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </div>
  )
}