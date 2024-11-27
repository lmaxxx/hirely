import {PlusCircle} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";

const templates = [
  {id: 1, name: "Blog Post", category: "Content", lastModified: "2023-06-15"},
  {id: 2, name: "Newsletter", category: "Email", lastModified: "2023-06-14"},
  {id: 3, name: "Landing Page", category: "Web", lastModified: "2023-06-13"},
  {id: 4, name: "Product Description", category: "E-commerce", lastModified: "2023-06-12"},
  {id: 5, name: "Social Media Post", category: "Marketing", lastModified: "2023-06-11"},
]

export default function CompaniesPage() {
  const [selectedPage, setSelectedPage] = useState("companies");
  const navigate = useNavigate();

  useEffect(() => {
    if(selectedPage === "applications") {
      navigate("/list/applications");
    }
  }, [selectedPage]);

  return (
    <main className="container">
      <div className="flex justify-between items-center mb-6">
        <Select onValueChange={setSelectedPage} value={selectedPage} defaultValue="applications">
          <SelectTrigger className="text-xl w-56 font-semibold">
            <SelectValue placeholder="Select view" />
          </SelectTrigger>
          <SelectContent className={"text-xl font-semibold"}>
            <SelectItem value="applications">Your Applications</SelectItem>
            <SelectItem value="companies">Your Companies</SelectItem>
          </SelectContent>
        </Select>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4"/>
          New Company
        </Button>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Last Modified</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {templates.map((template) => (
              <TableRow key={template.id}>
                <TableCell className="font-medium">{template.name}</TableCell>
                <TableCell>{template.category}</TableCell>
                <TableCell>{template.lastModified}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">
                    Edit
                  </Button>
                  <Button variant="ghost" size="sm" className="text-destructive">
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </main>
  )
}