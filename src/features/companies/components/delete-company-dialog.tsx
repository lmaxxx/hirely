import {
  AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Input} from "@/components/ui/input.tsx";
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";

type Props = {
  companyName: string;
  onDelete: () => void;
}

export default function DeleteCompanyDialog({companyName, onDelete}: Props) {
  const [open, setOpen] = useState(false);
  const {register, handleSubmit, reset, watch} = useForm({
    defaultValues: {
      input: ""
    }
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
        <Button variant="ghost" size="sm" className="text-destructive">Delete</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete
            "<span className={"font-bold"}>{companyName}</span>" and remove all applications linked with this company.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <form onSubmit={handleSubmit(onDelete)}>
            <Input {...register("input")}/>
          <AlertDialogFooter className={"mt-2"}>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              type={"submit"}
              disabled={input !== companyName}
              className={"bg-destructive hover:bg-red-600"}
            >Delete</AlertDialogAction>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  )
}