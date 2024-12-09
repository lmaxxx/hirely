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
import * as z from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {ReactNode, useEffect, useState} from "react";
import {createCompany} from "@/features/companies/service.ts";
import {toast} from "react-toastify";
import {useSession} from "@/hooks/useSession.tsx";
import {createFormSchema} from "@/features/companies/form-validation.ts";

type Props = {
  onClose: () => void;
  children: ReactNode;
}

export default function CreateCompanyFormDialog({onClose, children}: Props) {
  const form = useForm<z.infer<typeof createFormSchema>>({
    resolver: zodResolver(createFormSchema),
    defaultValues: {
      name: "",
      logo: new DataTransfer().files,
    }
  });
  const fileRef = form.register("logo");
  const [open, setOpen] = useState(false);
  const {session} = useSession();
  const [isLoading, setIsLoading] = useState(false);
  form.watch("logo"); // force rerender after image selection

  const onSubmit = async (values: z.infer<typeof createFormSchema>) => {
    try {
      setIsLoading(true);
      await createCompany(values, session?.user.id);
      onClose();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
      setOpen(false);
    }
  }

  useEffect(() => {
    if (!open) {
      form.reset()
    }
  }, [open])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild >
        {children}
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[425px]"
        onInteractOutside={isLoading ? (e) => e.preventDefault() : (_) => {}} // preventing close dialog while isLoading
        onEscapeKeyDown={isLoading ? (e) => e.preventDefault() : (_) => {}}
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
          <form onSubmit={form.handleSubmit(onSubmit)} className={"space-y-4"}>
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