import {
  Sheet,
  SheetContent, SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {CompanyWithApplicationCount} from "@/entities.type.ts";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {DialogFooter} from "@/components/ui/dialog.tsx";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {toast} from "react-toastify";
import {useEffect, useState} from "react";
import {updateCompanyById} from "@/features/companies/service.ts";
import {Loader2} from "lucide-react";
import {editCompanyFormSchema, EditCompanyFormValues} from "@/features/companies/form-validation.ts";
import useHandleRequest from "@/hooks/use-handle-request.tsx";
import RichEditor from "@/components/rich-editor.tsx";

type Props = {
  company: CompanyWithApplicationCount;
  onUpdate: (company: CompanyWithApplicationCount) => void;
}

export default function EditCompanyFormSheet({company, onUpdate}: Props) {
  const {run, isLoading} = useHandleRequest();
  const [open, setOpen] = useState(false);
  const form = useForm<EditCompanyFormValues>({
    resolver: zodResolver(editCompanyFormSchema),
    defaultValues: {
      name: company.name,
      logo: new DataTransfer().files,
    }
  });
  const fileRef = form.register("logo");
  form.watch("logo"); // force rerender after image selection
  const [descriptionContent, setDescriptionContent] = useState<string>("<p></p>");

  const onSubmit = async (values: EditCompanyFormValues) => run(
    async () => {
      const updatedCompany = (await updateCompanyById(company.id, values, descriptionContent))[0];
      onUpdate(updatedCompany);
      toast.success("Company was updated successfully.");
      setOpen(false);
    },
    () => setOpen(false)
  )

  const removeSelectedLogo = () => {
    // I used DataTransfer().items because FileList doesn't have its constructor
    form.setValue("logo", new DataTransfer().files)
  }

  const isNewData = () => {
    const formValues = form.getValues();
    return company.name !== formValues.name || !!formValues.logo?.[0] || descriptionContent !== company.description;
  }

  useEffect(() => {
    if(!open) {
      form.setValue("name", company.name)
      setDescriptionContent(company.description)
      removeSelectedLogo();
      form.clearErrors();
    }
  }, [open]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button className={"mr-2"} variant="ghost" size="sm">Edit</Button>
      </SheetTrigger>
      <SheetContent
        onInteractOutside={isLoading ? (e) => e.preventDefault() : () => {}} // preventing close sheet while isLoading
        onEscapeKeyDown={isLoading ? (e) => e.preventDefault() : () => {}}
        disabledCross={isLoading}
      >
        <SheetHeader>
          <SheetTitle>Edit company</SheetTitle>
        </SheetHeader>
        <SheetDescription/>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className={"space-y-4 mt-4 h-full overflow-y-auto"}>
            <img
              src={form.getValues("logo")?.[0] ? URL.createObjectURL(form.getValues("logo")?.[0]) : company.logo}
              alt="Selected image preview"
              className="rounded object-cover object-center w-24 h-24 border"
            />
            <FormField
              control={form.control}
              name={"logo"}
              render={() => (
                <FormItem>
                  <FormLabel>
                    <Button variant={"secondary"} asChild>
                      <span className={"cursor-pointer"}>Upload logo</span>
                    </Button>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type={"file"}
                      accept={"image/*"}
                      className={"hidden"}
                      {...fileRef}
                    ></Input>
                  </FormControl>
                  {
                    form.getValues("logo")?.[0] &&
                    <Button onClick={removeSelectedLogo} type={"button"} className={"ml-2"} variant={"outline"}>Remove</Button>
                  }
                  <FormMessage/>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={"name"}
              render={({field}) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder={"Company name"} {...field}/>
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
                />
            }
            <DialogFooter>
              <Button type="submit" disabled={isLoading || !isNewData()} className={"mb-8"}>
                {isLoading && <Loader2 className="animate-spin mr-2 h-4 w-4"/>}
                Save changes
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
}