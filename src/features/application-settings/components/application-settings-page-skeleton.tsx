import SectionHeader from "@/components/section-header.tsx";
import {Skeleton} from "@/components/ui/skeleton.tsx";

export default function ApplicationSettingsPageSkeleton() {
  return (
    <main className="w-full min-h-screen">
      <SectionHeader title={"Settings"}/>
      <div className={"p-3"}>
        <div className={"flex items-center justify-between gap-2"}>
          <div className={"flex items-center justify-start gap-2"}>
            <Skeleton className={"w-16 h-6"}/>
            <Skeleton className={"w-32 h-6"}/>
          </div>
          <Skeleton className={"w-8 h-6"}/>
        </div>
        <Skeleton className={"max-w-sm h-9 mt-4"}/>
        <Skeleton className={"max-w-2xl h-9 mt-3"}/>
        <Skeleton className={"max-w-2xl h-40 mt-2"}/>
        <div className={"flex items-center gap-2 mt-4"}>
          <Skeleton className={"w-32 h-9"}/>
          <Skeleton className={"w-20 h-9"}/>
        </div>
        <Skeleton className={"w-20 h-9 mt-2"}/>
      </div>
    </main>
  )
}