import {PlusCircle} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {useSession} from "@/hooks/useSession.tsx";

const templates = [
  {id: 1, name: "Blog Post", category: "Content", lastModified: "2023-06-15"},
  {id: 2, name: "Newsletter", category: "Email", lastModified: "2023-06-14"},
  {id: 3, name: "Landing Page", category: "Web", lastModified: "2023-06-13"},
  {id: 4, name: "Product Description", category: "E-commerce", lastModified: "2023-06-12"},
  {id: 5, name: "Social Media Post", category: "Marketing", lastModified: "2023-06-11"},
]

export default function ApplicationsPage() {
  const {session} = useSession();

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="flex justify-between items-center mb-8 border-b pb-4">
        <div className="flex items-center">
          <span className="text-xl font-semibold">Hirely</span>
        </div>
        <h1>{session?.user?.user_metadata?.name}</h1>
      </header>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Your Templates</h2>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4"/>
          New Template
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
    </div>
  )
}