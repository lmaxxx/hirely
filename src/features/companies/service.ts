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

//TODO also delete all applications that is linked with this company
export async function deleteCompanyById(id: number) {
  const {error: deleteCompanyError, data} = await supabase.from("company").delete().eq("id", id).select("*");
  if(deleteCompanyError || !data) throw deleteCompanyError;

  const fileName = data[0].logo.split("/").pop();
  await deleteLogo(fileName);
}

export async function updateCompanyById(id: number, values: z.infer<typeof editSchema>, description: string) {
  const newData: {
    name: string;
    description: string;
    modified_at: string;
    logo?: string;
  } = {
    name: values.name,
    description,
    modified_at: new Date().toISOString(),
    logo: '',
  };

  if(values.logo.length) {
    const {error: logoError, data: logos} = await supabase.from("company").select("logo").eq("id", id);
    if(logoError || !logos) throw logoError;

    const newLogo = values.logo[0];
    newData.logo = await uploadLogoAndGetUrl(newLogo);

    const oldLogo = logos[0].logo.split("/").pop();
    await deleteLogo(oldLogo);
  } else {
    delete newData.logo;
  }

  const {error, data} = await supabase.from("company")
    .update(newData)
    .eq("id", id)
    .select("*");
  if(error) throw error;
  return data;
}

async function deleteLogo(fileName: string | undefined) {
  if(fileName) {
    const { error: deleteLogoError } = await supabase
      .storage
      .from('logo')
      .remove([fileName])
    if(deleteLogoError) throw deleteLogoError;
  }
}