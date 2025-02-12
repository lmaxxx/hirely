import TextField from "@/features/template/components/text-field.tsx";
import CheckboxField from "@/features/template/components/checkbox-field.tsx";
import TextareaField from "@/features/template/components/textarea-field.tsx";
import NumberField from "@/features/template/components/number-field.tsx";
import LinkField from "@/features/template/components/link-field.tsx";
import FileField from "@/features/template/components/file-field.tsx";
import {Field} from "@/entities.type.ts";

type Props = {
  field: Field
}

export default function TemplateField({field}: Props) {
  switch (field.type) {
    case "text": return <TextField field={field} />
    case "checkbox": return <CheckboxField field={field} />
    case "textarea": return <TextareaField field={field} />
    case "number": return <NumberField field={field} />
    case "link": return <LinkField field={field} />
    case "file": return <FileField field={field} />
  }
}