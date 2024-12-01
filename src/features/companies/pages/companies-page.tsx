import {useEffect, useState} from "react";
import {useNavigate} from "react-router";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import CreateCompanyFormDialog from "@/features/companies/components/create-company-form-dialog.tsx";
import CompaniesList from "@/features/companies/components/companies-list.tsx";
import {getAllCompanies} from "@/features/companies/service.ts";
import {toast} from "react-toastify";
import {useSession} from "@/hooks/useSession.tsx";
import {Company} from "@/entities.type.ts";
import CompaniesListSkeleton from "@/features/companies/components/companies-list-skeleton.tsx";

const COMPANIES_LIMIT = 10;

export default function CompaniesPage() {
  const [companies, setCompanies] = useState<Company[] | null>(null);
  const [selectedPage, setSelectedPage] = useState("companies");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const {session} = useSession();

  const fetchCompanies = async () => {
    setIsLoading(true)

    try {
      const data = await getAllCompanies(session?.user.id);
      setCompanies(data);
      console.log(data)
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if(selectedPage === "applications") {
      navigate("/list/applications");
    }
  }, [selectedPage]);

  useEffect(() => {
    fetchCompanies();
  }, []);

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
        <CreateCompanyFormDialog disabled={(companies?.length ?? 0) >= COMPANIES_LIMIT} onClose={fetchCompanies}/>
      </div>
      {isLoading? <CompaniesListSkeleton/> : <CompaniesList companies={companies}/>}
    </main>
  )
}