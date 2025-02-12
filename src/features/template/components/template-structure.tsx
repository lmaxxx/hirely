import TemplateField from "@/features/template/components/template-field.tsx";
import {Field} from "@/entities.type.ts";


type Props = {
  templateFields: Field[]
}

export default function TemplateStructure({templateFields}: Props) {
  return (
    <div className={"w-full grid place-items-center h-full p-3 bg-[#F5F5F5]"}>
      <div className={"max-w-xl w-full flex gap-3.5 flex-col"}>
        {
          templateFields.map((field) => (
            <TemplateField key={field.id} field={field}/>
          ))
        }
      </div>
    </div>
  )
}