import {Field} from "@/entities.type.ts";
import {AlignCenter, GripVertical} from "lucide-react";
import {Label} from "@/components/ui/label.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";

type Props = {
  field: Field;
}

export default function TextareaField({field}: Props) {
  return (
    <section>
      <p className={"flex gap-1 items-center text-xs mb-1 text-muted-foreground"}>
        <AlignCenter className={"text-xs h-4 w-4"}/>
        Textarea
        ({field.name})
      </p>
      <div className={"flex gap-2"}>
        <div className={"bg-white p-2 border-1 rounded w-full"}>
          <Label htmlFor={field.name}>
            {field.label}
            {field.required && <span className={"text-red-400"}> *</span>}
          </Label>
          <Textarea id={field.name} placeholder={field.placeholder ?? ""} disabled className={"resize-none"}/>
        </div>
        <GripVertical className={"cursor-grab text-gray-500"}/>
      </div>
    </section>
  );
}