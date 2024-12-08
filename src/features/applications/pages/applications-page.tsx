import {Button} from "@/components/ui/button.tsx";
import {Select, SelectTrigger, SelectValue, SelectContent, SelectItem} from "@/components/ui/select.tsx"
import {useEffect, useState} from "react";
import {useNavigate} from "react-router";
import {getAllCompanies} from "@/features/companies/service.ts";
import {toast} from "react-toastify";
import {Application, Company} from "@/entities.type.ts";
import {useSession} from "@/hooks/useSession.tsx";
import {Loader2, PlusCircle} from "lucide-react";
import {getAllApplications} from "@/features/applications/service.ts";
import CompaniesListSkeleton from "@/features/companies/components/companies-list-skeleton.tsx";
import ApplicationsList from "@/features/applications/components/applications-list.tsx";
import {APPLICATIONS_LIMIT} from "&/env-variables.ts";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip.tsx";
import CreateApplicationFormDialog from "@/features/applications/components/create-application-dialog.tsx";

export default function ApplicationsPage() {
  const [selectedPage, setSelectedPage] = useState("applications");
  const [companies, setCompanies] = useState<Company[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const {session} = useSession();
  const navigate = useNavigate();

  const fetchData = async () => {
    setIsLoading(true)
    try {
      await fetchCompanies();
      await fetchApplications();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  const fetchCompanies = async () => {
    const fetchedCompanies = await getAllCompanies(session?.user.id);
    setCompanies(fetchedCompanies);
  }

  const fetchApplications = async () => {
    const fetchedApplications = await getAllApplications(session?.user.id);
    setApplications(fetchedApplications);
  }

  useEffect(() => {
    if(selectedPage === "companies") {
      navigate("/list/companies");
    }
  }, [selectedPage]);

  useEffect(() => {
    fetchData();
  }, []);

  const dialogButton = (
    ((applications.length ?? 0) >= APPLICATIONS_LIMIT || !companies.length) && !isLoading ?
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <span tabIndex={0}>
              <Button disabled={true}>
                <PlusCircle className="mr-2 h-4 w-4"/>
                New Application
              </Button>
            </span>
          </TooltipTrigger>
          <TooltipContent>
            {
              !companies.length ?
                <p>You need to have at least one company</p>
                :
                <p>You can't create more than {APPLICATIONS_LIMIT} applications</p>
            }

          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      :
      <CreateApplicationFormDialog companies={companies} onClose={fetchApplications}>
        <Button disabled={isLoading}>
          {isLoading ? <Loader2 className="animate-spin mr-2 h-4 w-4"/> : <PlusCircle className="mr-2 h-4 w-4"/>}
          New Application
        </Button>
      </CreateApplicationFormDialog>
  )

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
        {dialogButton}
      </div>
      {isLoading ? <CompaniesListSkeleton/> : <ApplicationsList applications={applications}/>}
    </main>
  )
}