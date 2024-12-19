import {
  Dialog,
  DialogContent,
  DialogDescription, DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Loader2} from "lucide-react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {PropsWithChildren, useEffect, useState} from "react";
import {addNewCompany} from "@/features/companies/service.ts";
import {useSession} from "@/hooks/use-session.tsx";
import {createCompanyFormSchema, CreateCompanyFormValues} from "@/features/companies/form-validation.ts";
import useHandleRequest from "@/hooks/use-handle-request.tsx";

type Props = {
  onClose: () => void;
}

export default function CreateCompanyFormDialog({onClose, children}: PropsWithChildren<Props>) {
  const form = useForm<CreateCompanyFormValues>({
    resolver: zodResolver(createCompanyFormSchema),
    defaultValues: {
      name: "",
      logo: new DataTransfer().files,
    }
  });
  const fileRef = form.register("logo");
  const [open, setOpen] = useState(false);
  const {session} = useSession();
  const {run, isLoading} = useHandleRequest()
  form.watch("logo"); // force rerender after image selection

  const handleSubmit = (values: CreateCompanyFormValues) => run(
    async () => {
      await addNewCompany(values, session?.user.id);
      onClose();
      setOpen(false);
    },
    () => {
      setOpen(false);
    }
  )


  useEffect(() => {
    if (!open) {
      form.reset()
    }
  }, [open])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[425px]"
        onInteractOutside={isLoading ? (e) => e.preventDefault() : () => {
        }} // preventing close dialog while isLoading
        onEscapeKeyDown={isLoading ? (e) => e.preventDefault() : () => {
        }}
        disabledCross={isLoading}
      >
        <DialogHeader>
          <DialogTitle>New Company</DialogTitle>
          <DialogDescription>
            Once your company profile is created, you’ll be able to select it for your
            applications and manage everything in one place.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-4"}>
            {form.getValues("logo") && form.getValues("logo")[0] && (
              <img
                src={URL.createObjectURL(form.getValues("logo")[0])}
                alt="Selected image preview"
                className="rounded object-cover object-center w-24 h-24 border"
              />
            )}
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
            <DialogFooter>
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="animate-spin mr-2 h-4 w-4"/>}
                Create
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}