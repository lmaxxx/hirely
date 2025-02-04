import {Field} from "@/features/template/components/template-structure.tsx";
import {Label} from "@/components/ui/label.tsx";
import {GripVertical, SquareCheckBig} from "lucide-react";
import {Checkbox} from "@/components/ui/checkbox.tsx";

type Props = {
  field: Field;
}

export default function CheckboxField({field}: Props) {
  return (
    <section>
      <p className={"flex gap-1 items-center text-xs mb-1 text-muted-foreground"}>
        <SquareCheckBig className={"text-xs h-4 w-4"}/>
        Checkbox
        ({field.name})
      </p>
      <div className={"flex gap-2"}>
        <div className={"bg-white p-2 border-1 rounded w-full flex gap-2 items-center"}>
          <Checkbox id={field.name} disabled></Checkbox>
          <Label htmlFor={field.name}>{field.label}</Label>
        </div>
        <GripVertical className={"cursor-grab text-gray-500"}/>
      </div>
    </section>
  );
}