import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {EditorContent, useEditor} from "@tiptap/react";
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
import StarterKit from "@tiptap/starter-kit";
import {useEffect} from "react";
import {useParams} from "react-router";
import {Application} from "@/entities.type.ts";
import {updateApplicationById} from "@/features/applications/service.ts";

const extensions = [StarterKit]

type Props = {
  application: Application
  setApplication: (value: Application) => void
}

export default function EditApplicationSettingsForm({application, setApplication}: Props) {
  const {applicationId} = useParams();
  const {run, isLoading} = useHandleRequest();
  const editor = useEditor({
    extensions,
    content: application.description ?? ""
  })
  const form = useForm({
    resolver: zodResolver(editApplicationSettings),
    defaultValues: {
      position: "",
    },
  })
  form.watch("position")

  const isNewData = () => {
    return application.position !== form.getValues("position") || editor?.getHTML() !== application.description;
  }

  const onSubmit = (values: EditApplicationSettingsValues) => run(
    async () => {
      const updatedApplication = await updateApplicationById(
        +applicationId!,
        {...values, description: editor?.getHTML()}
      )
      toast.success("Application was updated successfully.");
      setApplication(updatedApplication)
    }
  )

  const onReset = () => {
    form.setValue("position", application.position);
    editor?.commands.setContent(application.description)
  }

  useEffect(() => {
    if (application) {
      form.setValue("position", application.position);
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
        <div className={"editor-container"}>
          <EditorContent editor={editor}/>
        </div>
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