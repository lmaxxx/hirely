import {useEffect, useState} from "react";
import {Switch} from "@/components/ui/switch.tsx";
import {Loader2} from "lucide-react";
import PublishStatusBadge from "@/components/publish-status-badge.tsx";
import {getApplicationSettings, updatePublishedState} from "@/features/application-settings/service.ts";
import {Application} from "@/entities.type.ts";
import {useParams} from "react-router";
import useHandleRequest from "@/hooks/use-handle-request.tsx";

export default function ApplicationSettingsPage () {
  const [isPublished, setIsPublished] = useState(false)
  const {run: updateIsPublishRequest, isLoading: isPublishUpdateLoading} = useHandleRequest();
  const {run: getApplicationSettingsRequest, isLoading: isGetApplicationSettingsLoading} = useHandleRequest();
  const [application, setApplication] = useState<Application | null>(null)
  const {applicationId} = useParams();

  const handleToggle = () => {
    updateIsPublishRequest(
      async () => {
        await updatePublishedState(+applicationId!, !isPublished)
        setIsPublished(!isPublished)
      }
    )
  }

  useEffect(() => {
    getApplicationSettingsRequest(
      async () => {
        const application = await getApplicationSettings(+applicationId!);
        setApplication(application);
        setIsPublished(!!application.published_at);
      }
    )
  }, []);

  if(isGetApplicationSettingsLoading) {
    return <h1>Loading</h1>
  }

  return (
    <main className="w-full min-h-screen">
      <h1 className={"text-2xl border-b p-3"}>Settings</h1>
      <div className={"p-3"}>
        <div className={"flex items-center justify-between gap-2"}>
          <div className={"flex items-center justify-start gap-2"}>
            Status:
            <PublishStatusBadge isPublished={isPublished}/>
            {isPublishUpdateLoading && (
              <Loader2 className="h-4 w-4 animate-spin text-gray-500"/>
            )}
          </div>
          <Switch
            checked={isPublished}
            onCheckedChange={handleToggle}
            disabled={isPublishUpdateLoading}
            className={"data-[state=checked]:bg-green-400"}
          />
        </div>
      </div>
    </main>
  )
}