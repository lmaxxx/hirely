import {GripVertical} from "lucide-react";
import {Skeleton} from "@/components/ui/skeleton.tsx";

export default function TemplateStructureSkeleton() {
  return (
    <div className={"w-full grid place-items-center h-full p-3 bg-[#F5F5F5]"}>
      <div className={"max-w-xl w-full flex gap-3.5 flex-col"}>
        <section>
          <Skeleton className={"w-14 h-5 mb-2"}/>
          <div className={"flex gap-2"}>
            <Skeleton className={"w-full h-14"}/>
            <GripVertical className={"cursor-grab text-gray-500"}/>
          </div>
        </section>
        <section>
          <Skeleton className={"w-14 h-5 mb-2"}/>
          <div className={"flex gap-2"}>
            <Skeleton className={"w-full h-14"}/>
            <GripVertical className={"cursor-grab text-gray-500"}/>
          </div>
        </section>
        <section>
          <Skeleton className={"w-14 h-5 mb-2"}/>
          <div className={"flex gap-2"}>
            <Skeleton className={"w-full h-14"}/>
            <GripVertical className={"cursor-grab text-gray-500"}/>
          </div>
        </section>
        <section>
          <Skeleton className={"w-14 h-5 mb-2"}/>
          <div className={"flex gap-2"}>
            <Skeleton className={"w-full h-14"}/>
            <GripVertical className={"cursor-grab text-gray-500"}/>
          </div>
        </section>
        <section>
          <Skeleton className={"w-14 h-5 mb-2"}/>
          <div className={"flex gap-2"}>
            <Skeleton className={"w-full h-14"}/>
            <GripVertical className={"cursor-grab text-gray-500"}/>
          </div>
        </section>
      </div>
    </div>
  )
}