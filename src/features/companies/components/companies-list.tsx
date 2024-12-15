import {Table, TableBody, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {CompanyWithApplicationCount} from "@/entities.type.ts";
import {Frown} from "lucide-react";
import CompaniesListItem from "@/features/companies/components/companies-list-item.tsx";

type Props = {
  companies: CompanyWithApplicationCount[];
  onDelete: (id: number) => void;
  onUpdate: (company: CompanyWithApplicationCount) => void;
}

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
              <CompaniesListItem company={company} onUpdate={onUpdate} onDelete={onDelete}/>
            ))
          }
        </TableBody>
      </Table>
    </div>
  )
}