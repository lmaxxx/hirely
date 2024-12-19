import supabase from "@/lib/supabase.ts";
import {uuid} from "@supabase/supabase-js/dist/module/lib/helpers";
import {
  CreateCompanyFormValues,
  EditCompanyFormValues
} from "@/features/companies/form-validation.ts";

async function uploadLogoAndRetrieveUrl(file: File) {
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

export async function addNewCompany({logo, name}: CreateCompanyFormValues, userId?: string) {
  if(!userId) throw new Error("Unauthorized user");
  const file = logo[0]
  const logoPublicUrl = await uploadLogoAndRetrieveUrl(file)
  const {error: insertionError} = await supabase.from("company").insert({
    name,
    logo: logoPublicUrl,
    author: userId
  });

  if(insertionError) throw insertionError;
}

export async function fetchCompaniesWithApplications(userId?: string) {
  if(!userId) throw new Error("Unauthorized user");

  const {data, error} = await supabase.from("company")
    .select("*, application(count)", {count: "exact"})
    .eq("author", userId)
    .order("modified_at", {ascending: false})

  if(error) throw error;

  return data;
}

//TODO also delete all applications that is linked with this company (and companies logos)
export async function removeCompanyAndAssociatedData(id: number) {
  const {error: deleteCompanyError, data} = await supabase.from("company").delete().eq("id", id).select("*");
  if(deleteCompanyError || !data) throw deleteCompanyError;

  const fileName = data[0].logo.split("/").pop();
  await removeLogoFile(fileName);
}

export async function modifyCompanyDetails(id: number, values: EditCompanyFormValues, description: string) {
  const newData: {
    name: string;
    description: string;
    logo?: string;
  } = {
    name: values.name,
    description,
  };

  if(values.logo.length) {
    const {error: logoError, data: logos} = await supabase.from("company").select("logo").eq("id", id);
    if(logoError || !logos) throw logoError;

    const newLogo = values.logo[0];
    newData.logo = await uploadLogoAndRetrieveUrl(newLogo);

    const oldLogo = logos[0].logo.split("/").pop();
    await removeLogoFile(oldLogo);
  }

  const {error, data} = await supabase.from("company")
    .update(newData)
    .eq("id", id)
    .select("*, application(count)", {count: "exact"})
  if(error) throw error;
  return data;
}

async function removeLogoFile(fileName: string | undefined) {
  if(fileName) {
    const { error: deleteLogoError } = await supabase
      .storage
      .from('logo')
      .remove([fileName])
    if(deleteLogoError) throw deleteLogoError;
  }
}