import {Badge} from "@/components/ui/badge.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {DialogFooter} from "@/components/ui/dialog.tsx";
import {Loader2} from "lucide-react";
import {useForm} from "react-hook-form";
import * as z from "zod";
import {createApplicationFormSchema} from "@/features/applications/form-validation.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {useState} from "react";

export default function ApplicationSettingsPage () {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof createApplicationFormSchema>>({
    resolver: zodResolver(createApplicationFormSchema),
    defaultValues: {
      position: "",
      company: ""
    }
  });

  return (
    <main className="w-full min-h-screen">
      <h1 className={"text-2xl border-b p-3"}>Settings</h1>
      <div className={"p-3"}>
        <div>
          Status: <Badge className={"bg-red-500 hover:bg-red-600 text-sm"}>Not published</Badge>
        </div>

        <Form {...form}>
          <form className={"space-y-4"}>
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
            <DialogFooter>
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="animate-spin mr-2 h-4 w-4"/>}
                Create
              </Button>
            </DialogFooter>
          </form>
        </Form>

        <Button className={"bg-green-400"}>Publish</Button>
      </div>
    </main>
  )
}