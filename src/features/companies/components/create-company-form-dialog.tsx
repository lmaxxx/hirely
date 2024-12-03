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

type Props = {
  onClose: () => void;
  disabled: boolean;
}

export const formSchema = z.object({
  logo: z.instanceof(FileList).superRefine((files, ctx) => {
    if (!files.length) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Provide the logo.",
      });
      return z.NEVER;
    }

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
  })
});

export default function CreateCompanyFormDialog({onClose, disabled}: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      logo: undefined
    }
  });
  const fileRef = form.register("logo");
  const [open, setOpen] = useState(false);
  const {session} = useSession();
  const [isLoading, setIsLoading] = useState(false);
  form.watch("logo"); // force rerender after image selection

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
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
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4"/>
          New Company
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
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
                className="rounded object-cover object-center w-24 h-24"
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
                {isLoading && <Loader2 className="animate-spin"/>}
                Sign In
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}