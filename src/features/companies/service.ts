import {formSchema} from "@/features/companies/components/create-company-form-dialog.tsx";
import {z} from "zod";
import supabase from "@/lib/supabase.ts";
import {uuid} from "@supabase/supabase-js/dist/module/lib/helpers";

export async function createCompany({logo, name}: z.infer<typeof formSchema>, userId?: string) {
  if(!userId) throw new Error("Unauthorized user");

  const file = logo[0]

  const path = `${uuid()}.${file.type.split("/").pop()}`;
  const { error: uploadError} = await supabase.storage.from("logo")
    .upload(path, logo[0]);
  if(uploadError) throw uploadError;

  const { data: {publicUrl} } = supabase
    .storage
    .from('logo')
    .getPublicUrl(path);

  const {error: insertionError} = await supabase.from("company").insert({
    name,
    logo: publicUrl,
    author: userId
  });

  if(insertionError) throw insertionError;
}

export async function getAllCompanies(userId?: string) {
  if(!userId) throw new Error("Unauthorized user");

  const {data, error} = await supabase.from("company")
    .select("*")
    .eq("author", userId)
    .order("modified_at", {ascending: false})

  if(error) throw error;

  return data;
}

//TODO also delete all applications that is linked with this company
export async function deleteCompanyById(id: number) {
  const {error} = await supabase.from("company").delete().eq("id", id);
  if(error) throw error;
}