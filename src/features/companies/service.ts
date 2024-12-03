import {formSchema as createSchema} from "@/features/companies/components/create-company-form-dialog.tsx";
import {z} from "zod";
import supabase from "@/lib/supabase.ts";
import {uuid} from "@supabase/supabase-js/dist/module/lib/helpers";
import {formSchema as editSchema} from "@/features/companies/components/edit-company-form-sheet.tsx";

async function uploadLogoAndGetUrl(file: File) {
  const path = `${uuid()}.${file.type.split("/").pop()}`;
  const { error: uploadError} = await supabase.storage.from("logo")
    .upload(path, file);
  if(uploadError) throw uploadError;

  const { data: {publicUrl} } = supabase
    .storage
    .from('logo')
    .getPublicUrl(path);

  return publicUrl;
}

export async function createCompany({logo, name}: z.infer<typeof createSchema>, userId?: string) {
  if(!userId) throw new Error("Unauthorized user");
  const file = logo[0]
  const logoPublicUrl = await uploadLogoAndGetUrl(file)
  const {error: insertionError} = await supabase.from("company").insert({
    name,
    logo: logoPublicUrl,
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

//TODO also delete all applications that is linked with this company and logo
export async function deleteCompanyById(id: number) {
  const {error} = await supabase.from("company").delete().eq("id", id);
  if(error) throw error;
}

//TODO delete previous logo from bucket
export async function updateCompanyById(id: number, {name, logo}: z.infer<typeof editSchema>, description: string) {
  if(logo.length) {
    const publicLogoUrl = await uploadLogoAndGetUrl(logo[0]);
    const {error, data} = await supabase.from("company")
      .update({
        name,
        description,
        logo: publicLogoUrl,
        modified_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select("*");

    if(error) throw error;
    return data;
  }

  const {error, data} = await supabase.from("company")
    .update({
      name,
      description,
      modified_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select("*");
  if(error) throw error;
  return data;
}