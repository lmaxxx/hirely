import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog.tsx";
import {Input} from "@/components/ui/input.tsx";
import {PropsWithChildren, useEffect, useState} from "react";
import {useForm} from "react-hook-form";

type Props = {
  onDelete: () => void;
  requiredString: string
  description: string
}

export default function DeleteWithConfirmationDialog({
                                                       children,
                                                       onDelete,
                                                       requiredString,
                                                       description
}: PropsWithChildren<Props>) {
  const [open, setOpen] = useState(false);
  const {register, handleSubmit, reset, watch} = useForm({
    defaultValues: {input: ""}
  })
  const input = watch("input")

  useEffect(() => {
    if(!open) {
      reset();
    }
  }, [open])

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        {/*<Button variant="ghost" size="sm" className="text-destructive">Delete</Button>*/}
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            {description.split("$$$")[0]}
            "<span className={"font-bold"}>{requiredString}</span>"
            {description.split("$$$")[1]}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <form onSubmit={handleSubmit(onDelete)}>
          <Input {...register("input")}/>
          <AlertDialogFooter className={"mt-2"}>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              type={"submit"}
              disabled={input !== requiredString}
              className={"bg-destructive hover:bg-red-600"}
            >Delete</AlertDialogAction>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  )
}