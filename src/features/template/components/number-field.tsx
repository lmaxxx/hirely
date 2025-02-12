import {Field} from "@/entities.type.ts";
import {Input} from "@/components/ui/input.tsx";
import {Label} from "@/components/ui/label.tsx";
import {GripVertical, Hash} from "lucide-react";

type Props = {
  field: Field;
}

export default function NumberField({field}: Props) {
  return (
    <section>
      <p className={"flex gap-1 items-center text-xs mb-1 text-muted-foreground"}>
        <Hash className={"text-xs h-4 w-4"}/>
        Number ({field.name})
      </p>
      <div className={"flex gap-2"}>
        <div className={"bg-white p-2 border-1 rounded w-full"}>
          <Label htmlFor={field.name}>
            {field.label}
            {field.required && <span className={"text-red-400"}> *</span>}
          </Label>
          <Input id={field.name} placeholder={field.placeholder ?? ""} disabled type={"number"}/>
        </div>
        <GripVertical className={"cursor-grab text-gray-500"}/>
      </div>
    </section>

  );
}