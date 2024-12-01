import {formSchema} from "@/features/companies/components/create-company-form-dialog.tsx";
import {z} from "zod";
import supabase from "@/lib/supabase.ts";
import {uuid} from "@supabase/supabase-js/dist/module/lib/helpers";

export async function createCompany({logo, name}: z.infer<typeof formSchema>, userId?: string) {
  if(!userId) throw new Error("Unauthorized user");

  const file = logo[0]

  const path = `${uuid()}.${file.type.split("/").pop()}`;
  const { error: uploadError} = await supabase.storage.from("logos")
    .upload(path, logo[0]);
  if(uploadError) throw uploadError;

  const { data: {publicUrl} } = supabase
    .storage
    .from('logos')
    .getPublicUrl(path);

  const {error: insertionError} = await supabase.from("companies").insert({
    name,
    logo: publicUrl,
    author: userId
  });

  if(insertionError) throw insertionError;
}