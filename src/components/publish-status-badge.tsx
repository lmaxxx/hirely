import {Badge} from "@/components/ui/badge.tsx";
import {cn} from "@/lib/utils.ts";

type Props = {
  isPublished: boolean;
  className?: string;
}

export default function PublishStatusBadge({isPublished, className}: Props) {
  return (
    <>
      {
        isPublished ?
        <Badge className={cn("bg-green-400 hover:bg-green-500 text-sm", className)}>Published</Badge>
        :
        <Badge className={cn("bg-red-500 hover:bg-red-600 text-sm", className)}>Not published</Badge>
      }
    </>

  )
}