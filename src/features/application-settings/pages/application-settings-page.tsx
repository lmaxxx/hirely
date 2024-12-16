import {useState} from "react";
import {Switch} from "@/components/ui/switch.tsx";
import {Loader2} from "lucide-react";
import PublishStatusBadge from "@/components/publish-status-badge.tsx";

export default function ApplicationSettingsPage () {
  const [checked, setChecked] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleToggle = async () => {
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    setChecked(!checked)
    setIsLoading(false)
  }

  return (
    <main className="w-full min-h-screen">
      <h1 className={"text-2xl border-b p-3"}>Settings</h1>
      <div className={"p-3"}>
        <div className={"flex items-center justify-between gap-2"}>
          <div className={"flex items-center justify-start gap-2"}>
            Status:
            <PublishStatusBadge isPublished={checked}/>
            {isLoading && (
              <Loader2 className="h-4 w-4 animate-spin text-gray-500"/>
            )}
          </div>
          <Switch
            checked={checked}
            onCheckedChange={handleToggle}
            disabled={isLoading}
            className={"data-[state=checked]:bg-green-400"}
          />
        </div>
      </div>
    </main>
  )
}