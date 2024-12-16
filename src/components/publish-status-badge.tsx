import {Badge} from "@/components/ui/badge.tsx";

type Props = {
  isPublished: boolean;
}

export default function PublishStatusBadge({isPublished}: Props) {
  return (
    <>
      {
        isPublished ?
        <Badge className={"bg-green-400 hover:bg-green-500 text-sm"}>Published</Badge>
        :
        <Badge className={"bg-red-500 hover:bg-red-600 text-sm"}>Not published</Badge>
      }
    </>

  )
}