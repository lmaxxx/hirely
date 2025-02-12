import TemplateStructure from "@/features/template/components/template-structure.tsx";
import useHandleRequest from "@/hooks/use-handle-request.tsx";
import {useEffect, useState} from "react";
import {fetchTemplateByApplicationId} from "@/features/template/service.ts";
import {useParams} from "react-router";
import {Field} from "@/entities.type.ts";
import TemplateStructureSkeleton from "@/features/template/components/template-structure-skeleton.tsx";

export default function TemplatePage() {
  const [templateFields, setTemplateFields] = useState<Field[]>([]);
  const {run: fetchTemplateFields, isLoading: isFetchTemplateFieldsLoading} = useHandleRequest();
  const {applicationId} = useParams();

  const getTemplate = () => fetchTemplateFields(
    async () => {
      const fields = await fetchTemplateByApplicationId(applicationId);
      setTemplateFields(fields)
    },
  )

  useEffect(() => {
    getTemplate()
  }, []);

  return (
    <main className="w-full max-h-screen h-screen">
      {isFetchTemplateFieldsLoading ? <TemplateStructureSkeleton/> : <TemplateStructure templateFields={templateFields} />}
    </main>
  )
}

