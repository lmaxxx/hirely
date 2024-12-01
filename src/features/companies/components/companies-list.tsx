import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Company} from "@/entities.type.ts";

type Props = {
  companies: Company[] | null
  isLoading: boolean
}

export default function CompaniesList({companies, isLoading}: Props) {
  return (
    <div className="border rounded-lg overflow-hidden">
      {isLoading && <h1>Loading</h1>}
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
            companies ?
              companies.map((company) => (
                <TableRow key={company.id}>
                  <TableCell className="font-medium">{company.name}</TableCell>
                  <TableCell>0</TableCell>
                  <TableCell>{new Date(company.modified_at).toLocaleString()}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                    <Button variant="ghost" size="sm" className="text-destructive">
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
              :
              <h1>No companies yet</h1>
          }
        </TableBody>
      </Table>
    </div>
  )
}