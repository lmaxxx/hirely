import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Company} from "@/entities.type.ts";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {DialogFooter} from "@/components/ui/dialog.tsx";
import {useForm} from "react-hook-form";
import * as z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import {toast} from "react-toastify";
import {useEffect, useState} from "react";
import {updateCompanyById} from "@/features/companies/service.ts";
import {Loader2} from "lucide-react";

export const formSchema = z.object({
  logo: z.instanceof(FileList).superRefine((files, ctx) => {
    if(!files.length) return z.NEVER;

    if (!files[0].type.startsWith("image/")) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "You must provide an image.",
      });
      return z.NEVER;
    }

    if (files[0].size >= 1024 * 1024) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Image is too large."
      });
    }
  }),
  name: z.string().min(4, {
    message: "Name must be at least 4 characters long.",
  }),
});

type Props = {
  company: Company;
  onUpdate: (company: Company) => void;
}

const extensions = [StarterKit]

export default function EditCompanyFormSheet({company, onUpdate}: Props) {
  const [isLoading, setIsLoading] = useState(false)
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: company.name,
      logo: new DataTransfer().files,
    }
  });
  const fileRef = form.register("logo");
  form.watch("logo"); // force rerender after image selection
  const editor = useEditor({
    extensions,
    content: company.description ?? ""
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      const updatedCompany = (await updateCompanyById(company.id, values, editor?.getHTML() ?? "<p></p>"))[0];
      onUpdate(updatedCompany);
      toast.success("Company was updated successfully.");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
      setOpen(false);
    }
  }

  const removeSelectedLogo = () => {
    // I used DataTransfer().items because FileList doesn't have its constructor
    form.setValue("logo", new DataTransfer().files)
  }

  const isNewData = () => {
    const formValues = form.getValues();
    return company.name !== formValues.name || !!formValues.logo?.[0] || editor?.getHTML() !== company.description;
  }

  useEffect(() => {
    if(!open) {
      form.setValue("name", company.name)
      editor?.commands.setContent(company.description)
      removeSelectedLogo();
      form.clearErrors();
    }
  }, [open]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>
        <Button variant="ghost" size="sm">Edit</Button>
      </SheetTrigger>
      <SheetContent
        onInteractOutside={isLoading ? (e) => e.preventDefault() : (_) => {}} // preventing close sheet while isLoading
        onEscapeKeyDown={isLoading ? (e) => e.preventDefault() : (_) => {}}
        disabledCross={isLoading}
      >
        <SheetHeader>
          <SheetTitle>Edit company</SheetTitle>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className={"space-y-4 mt-4"}>
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
            <div className={"editor-container"}>
              <EditorContent  editor={editor}/>
            </div>
            <DialogFooter>
              <Button type="submit" disabled={isLoading || !isNewData()}>
                {isLoading && <Loader2 className="animate-spin" />}
                Save changes
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
}