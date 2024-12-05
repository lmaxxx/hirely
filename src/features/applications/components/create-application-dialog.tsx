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
import {Loader2, PlusCircle} from "lucide-react";
import * as z from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {useEffect, useState} from "react";
import {createCompany} from "@/features/companies/service.ts";
import {toast} from "react-toastify";
import {useSession} from "@/hooks/useSession.tsx";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip.tsx";
import {createFormSchema} from "@/features/applications/form-validation.ts";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";

type Props = {
  // onClose: () => void;
  // disabled: boolean;
}

export default function CreateCompanyFormDialog({onClose, disabled}: Props) {
  const form = useForm<z.infer<typeof createFormSchema>>({
    resolver: zodResolver(createFormSchema),
    defaultValues: {
      position: "",
      company: ""
    }
  });
  const [open, setOpen] = useState(false);
  const {session} = useSession();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (values: z.infer<typeof createFormSchema>) => {
    console.log(values)
    // try {
    //   setIsLoading(true);
    //   await createCompany(values, session?.user.id);
    //   onClose();
    // } catch (error) {
    //   toast.error(error.message);
    // } finally {
    //   setIsLoading(false);
    //   setOpen(false);
    // }
  }

  useEffect(() => {
    if (!open) {
      form.reset()
    }
  }, [open])

  if (disabled) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <span tabIndex={0}>
              <Button disabled={true}>
                <PlusCircle className="mr-2 h-4 w-4"/>
                New Company
              </Button>
            </span>
          </TooltipTrigger>
          <TooltipContent>
            <p>You can't create more than 10</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild >
        <Button>
          <PlusCircle className="mr-2 h-4 w-4"/>
          New Application
        </Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[425px]"
        onInteractOutside={isLoading ? (e) => e.preventDefault() : (_) => {}} // preventing close dialog while isLoading
        onEscapeKeyDown={isLoading ? (e) => e.preventDefault() : (_) => {}}
        disabledCross={isLoading}
      >
        <DialogHeader>
          <DialogTitle>New Application</DialogTitle>
          <DialogDescription>
            Fill in the details below to create and manage your job application. Provide the job position and company.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className={"space-y-4"}>
            <FormField
              control={form.control}
              name={"position"}
              render={({field}) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder={"Position"} {...field}/>
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={"company"}
              render={({field}) => (
                <FormItem>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select company" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1234">Google</SelectItem>
                        <SelectItem value="12345">Facebook</SelectItem>
                        <SelectItem value="123456">Meta</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="animate-spin"/>}
                Create
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}