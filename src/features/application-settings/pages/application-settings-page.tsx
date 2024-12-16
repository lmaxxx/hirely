import {useEffect, useState} from "react";
import {getApplicationSettings} from "@/features/application-settings/service.ts";
import {Application} from "@/entities.type.ts";
import {useParams} from "react-router";
import useHandleRequest from "@/hooks/use-handle-request.tsx";
import ApplicationSettingsStatusSwitch
  from "@/features/application-settings/components/application-settings-status-switch.tsx";
import EditApplicationSettingsForm from "@/features/application-settings/components/edit-application-settings-form.tsx";
import SectionHeader from "@/components/section-header.tsx";

export default function ApplicationSettingsPage () {
  const {run: getApplicationSettingsRequest, isLoading: isGetApplicationSettingsLoading} = useHandleRequest();
  const [application, setApplication] = useState<Application | null>(null)
  const {applicationId} = useParams();

  useEffect(() => {
    getApplicationSettingsRequest(
      async () => {
        const application = await getApplicationSettings(+applicationId!);
        setApplication(application);
      }
    )
  }, []);

  if(isGetApplicationSettingsLoading || !application) {
    return <h1>Loading</h1>
  }

  return (
    <main className="w-full min-h-screen">
      <SectionHeader title={"Settings"}/>
      <div className={"p-3"}>
        <ApplicationSettingsStatusSwitch application={application} setApplication={setApplication}/>
        <EditApplicationSettingsForm application={application} setApplication={setApplication}/>
      </div>
    </main>
  )
}