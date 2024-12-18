import {useEffect, useState} from "react";
import {useNavigate} from "react-router";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import CreateCompanyFormDialog from "@/features/companies/components/create-company-form-dialog.tsx";
import CompaniesList from "@/features/companies/components/companies-list.tsx";
import {removeCompanyAndAssociatedData, fetchCompaniesWithApplications} from "@/features/companies/service.ts";
import {toast} from "react-toastify";
import {useSession} from "@/hooks/use-session.tsx";
import {CompanyWithApplicationCount} from "@/entities.type.ts";
import CompaniesListSkeleton from "@/features/companies/components/companies-list-skeleton.tsx";
import {COMPANIES_LIMIT} from "&/env-variables.ts";
import {Button} from "@/components/ui/button.tsx";
import {PlusCircle} from "lucide-react";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip.tsx";
import useHandleRequest from "@/hooks/use-handle-request.tsx";

export default function CompaniesPage() {
  const [companies, setCompanies] = useState<CompanyWithApplicationCount[]>([]);
  const [selectedPage, setSelectedPage] = useState("companies");
  const navigate = useNavigate();
  const {run, isLoading} = useHandleRequest();
  const {session} = useSession();

  const fetchCompanies = () => run(
    async () => {
      const data = await fetchCompaniesWithApplications(session?.user.id);
      setCompanies(data);
    }
  )

  const removeCompany = async (id: number) => {
    await toast.promise(
      () => removeCompanyAndAssociatedData(id),
      {
        pending: "Deleting...",
        success: "Company deleted successfully.",
        error: "Failed to delete. Try again.",
      }
    )
    await fetchCompanies();
  }

  const modifyCompany = (updatedCompany: CompanyWithApplicationCount) => {
    setCompanies(oldCompanies => {
      const copy = [...oldCompanies!];
      return copy.map(company => {
        if (company.id === updatedCompany.id) return updatedCompany;
        return company;
      }).sort((a, b) => new Date(b.modified_at).getTime() - new Date(a.modified_at).getTime());
    });
  }

  useEffect(() => {
    if (selectedPage === "applications") {
      navigate("/list/applications");
    }
  }, [selectedPage]);

  useEffect(() => {
    fetchCompanies();
  }, []);

  const dialogButton = (
    (companies.length ?? 0) >= COMPANIES_LIMIT ?
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <span tabIndex={0}>
              <Button disabled={true}>
                <PlusCircle className="mr-2 h-4 w-4"/>
                New Company
              </Button>
            </span>
          </TooltipTrigger>
          <TooltipContent>
            <p>You can't create more than {COMPANIES_LIMIT} companies</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      :
      <CreateCompanyFormDialog
        onClose={fetchCompanies}
      >
        <Button>
          <PlusCircle className="mr-2 h-4 w-4"/>
          New Company
        </Button>
      </CreateCompanyFormDialog>
  )

  return (
    <main className="container">
      <div className="flex justify-between items-center mb-6">
        <Select onValueChange={setSelectedPage} value={selectedPage} defaultValue="applications">
          <SelectTrigger className="text-xl w-56 font-semibold">
            <SelectValue placeholder="Select view"/>
          </SelectTrigger>
          <SelectContent className={"text-xl font-semibold"}>
            <SelectItem value="applications">Your Applications</SelectItem>
            <SelectItem value="companies">Your Companies</SelectItem>
          </SelectContent>
        </Select>
        {dialogButton}
      </div>
      {isLoading ? <CompaniesListSkeleton/> :
        <CompaniesList onUpdate={modifyCompany} onDelete={removeCompany} companies={companies}/>}
    </main>
  )
}