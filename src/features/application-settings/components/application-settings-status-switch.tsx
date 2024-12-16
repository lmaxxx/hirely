import PublishStatusBadge from "@/components/publish-status-badge.tsx";
import {Loader2} from "lucide-react";
import {Switch} from "@/components/ui/switch.tsx";
import useHandleRequest from "@/hooks/use-handle-request.tsx";
import {useParams} from "react-router";
import {Application} from "@/entities.type.ts";
import {updateApplicationById} from "@/features/applications/service.ts";

type Props = {
  application: Application
  setApplication: (value: Application) => void
}

export default function ApplicationSettingsStatusSwitch({application, setApplication}: Props) {
  const {run, isLoading} = useHandleRequest();
  const {applicationId} = useParams();

  const handleToggle = () => {
    run(
      async () => {
        const updatedApplication = await updateApplicationById(
          +applicationId!,
          {published_at: !application?.published_at ? new Date().toISOString() : null}
        )
        setApplication(updatedApplication)
      }
    )
  }

  return (
    <div className={"flex items-center justify-between gap-2"}>
      <div className={"flex items-center justify-start gap-2"}>
        Status:
        <PublishStatusBadge isPublished={!!application?.published_at}/>
        {isLoading && (
          <Loader2 className="h-4 w-4 animate-spin text-gray-500"/>
        )}
      </div>
      <Switch
        checked={!!application?.published_at}
        onCheckedChange={handleToggle}
        disabled={isLoading}
        className={"data-[state=checked]:bg-green-400"}
      />
    </div>
  )
}