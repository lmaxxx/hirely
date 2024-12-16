import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Loader2} from "lucide-react";
import {
  editApplicationSettings,
  EditApplicationSettingsValues
} from "@/features/application-settings/form-validation.ts";
import {toast} from "react-toastify";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import useHandleRequest from "@/hooks/use-handle-request.tsx";
import {useEffect, useState} from "react";
import {useParams} from "react-router";
import {Application} from "@/entities.type.ts";
import {updateApplicationById} from "@/features/applications/service.ts";
import RichEditor from "@/components/rich-editor.tsx";


type Props = {
  application: Application
  setApplication: (value: Application) => void
}

export default function EditApplicationSettingsForm({application, setApplication}: Props) {
  const [descriptionContent, setDescriptionContent] = useState("");
  const {applicationId} = useParams();
  const {run, isLoading} = useHandleRequest();
  const form = useForm({
    resolver: zodResolver(editApplicationSettings),
    defaultValues: {
      position: "",
    },
  })
  form.watch("position")

  const isNewData = () => {
    return application.position !== form.getValues("position") || descriptionContent !== application.description;
  }

  const onSubmit = (values: EditApplicationSettingsValues) => run(
    async () => {
      const updatedApplication = await updateApplicationById(
        +applicationId!,
        {...values, description: descriptionContent}
      )
      toast.success("Application was updated successfully.");
      setApplication(updatedApplication)
    }
  )

  const onReset = () => {
    form.setValue("position", application.position);
    setDescriptionContent(application.description)
  }

  useEffect(() => {
    if (application) {
      form.setValue("position", application.position);
      setDescriptionContent(application.description)
    }
  }, [application]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={"space-y-4 mt-4"}>
        <FormField
          control={form.control}
          name={"position"}
          render={({field}) => (
            <FormItem>
              <FormControl>
                <Input placeholder={"Position"} {...field} className={"max-w-sm"}/>
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
        {
          descriptionContent &&
          <RichEditor
            content={descriptionContent}
            setContent={setDescriptionContent}
            valueToReset={application.description}
          />
        }
        <div className={"flex gap-2"}>
          <Button type="submit" disabled={isLoading || !isNewData()}>
            {isLoading && <Loader2 className="animate-spin mr-2 h-4 w-4"/>}
            Save changes
          </Button>
          <Button onClick={onReset} type={"button"} disabled={isLoading} variant={"secondary"}>
            Reset
          </Button>
        </div>
      </form>
    </Form>
  )
}