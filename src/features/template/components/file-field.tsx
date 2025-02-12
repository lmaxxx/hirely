import {Field} from "@/entities.type.ts";
import {GripVertical, Text} from "lucide-react";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";

type Props = {
  field: Field;
}

export default function FileField({field}: Props) {
  return (
    <section>
      <p className={"flex gap-1 items-center text-xs mb-1 text-muted-foreground"}>
        <Text className={"text-xs h-4 w-4"}/>
        File ({field.name})
      </p>
      <div className={"flex gap-2"}>
        <div className={"bg-white p-2 border-1 rounded w-full"}>

              <Button variant={"secondary"} asChild>
                <span className={"cursor-pointer"}>Upload {field.label}</span>
              </Button>

              <Input
                type={"file"}
                accept={"image/*"}
                className={"hidden"}
              ></Input>
        </div>
        <GripVertical className={"cursor-grab text-gray-500"}/>
      </div>
    </section>
  )
}