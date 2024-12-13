import {useEffect, useState} from "react";
import {Application} from "@/entities.type.ts";
import {useNavigate, useParams} from "react-router";
import useHandleRequest from "@/hooks/use-handle-request.tsx";
import ApplicationSettingsStatusSwitch
  from "@/features/application-settings/components/application-settings-status-switch.tsx";
import EditApplicationSettingsForm from "@/features/application-settings/components/edit-application-settings-form.tsx";
import SectionHeader from "@/components/section-header.tsx";
import DeleteWithConfirmationDialog from "@/components/delete-with-confirmation-dialog.tsx";
import {Button} from "@/components/ui/button.tsx";
import {deleteApplicationById, getApplicationById} from "@/features/applications/service.ts";
import {toast} from "react-toastify";

export default function ApplicationSettingsPage () {
  const {run: getApplicationSettingsRequest, isLoading: isGetApplicationSettingsLoading} = useHandleRequest();
  const {run: deleteApplicationRequest, isLoading: isDeleteApplicationRequestgLoading} = useHandleRequest({enableErrorToast: false});
  const [application, setApplication] = useState<Application | null>(null)
  const {applicationId} = useParams();
  const navigate = useNavigate();

  const onDelete = () => deleteApplicationRequest(
    async () => {
      await toast.promise(
        () => deleteApplicationById(+applicationId!),
        {
          pending: "Deleting...",
          success: "Company deleted successfully.",
          error: "Failed to delete. Try again.",
        }
      )
      navigate("/list/applications");
    }
  )

  useEffect(() => {
    getApplicationSettingsRequest(
      async () => {
        const application = await getApplicationById(+applicationId!);
        setApplication(application);
      }
    )
  }, []);

  if(isGetApplicationSettingsLoading || isDeleteApplicationRequestgLoading || !application) {
    return <h1>Loading</h1>
  }

  return (
    <main className="w-full min-h-screen">
      <SectionHeader title={"Settings"}/>
      <div className={"p-3"}>
        <ApplicationSettingsStatusSwitch application={application} setApplication={setApplication}/>
        <EditApplicationSettingsForm application={application} setApplication={setApplication}/>
        <DeleteWithConfirmationDialog
          requiredString={application.position}
          description={"This action cannot be undone. This will permanently " +
            "delete $$$ and remove all submissions " +
            "linked with this application."}
          onDelete={onDelete}
        >
          <Button
            variant="ghost"
            className="text-destructive hover:text-destructive mt-2"
            type={"button"}
          >Delete</Button>
        </DeleteWithConfirmationDialog>
      </div>
    </main>
  )
}