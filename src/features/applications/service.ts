import supabase from "@/lib/supabase.ts";
import {CreateApplicationFormValues} from "@/features/applications/form-validation.ts";
import {ApplicationUpdate} from "@/entities.type.ts";

export async function createApplication({position, company}: CreateApplicationFormValues, userId?: string) {
  if(!userId) throw new Error("Unauthorized user");
  const {error} = await supabase.from("application")
    .insert({
      position,
      author: userId,
      company: +company,
    })
  if(error) throw error;
}

export async function updateApplicationById(id: number, newData: ApplicationUpdate) {
  const {error, data} = await supabase.from("application")
    .update(newData)
    .eq("id", id)
    .select("*")
  if(error) throw error;
  return data[0];
}

export async function getAllApplicationsWithCompanyName(userId?: string) {
  if(!userId) throw new Error("Unauthorized user");

  const {data, error} = await supabase.from("application")
    .select("*, company (name)")
    .eq("author", userId)
    .order("modified_at", {ascending: false})

  if(error) throw error;

  return data;
}

export async function getApplicationById(id: number) {
  const {data, error} = await supabase.from("application").select("*").eq("id", id);
  if(error) throw error;

  return data[0];
}

export async function deleteApplicationById(id: number) {
  const {error} = await supabase.from("application")
    .delete().eq("id", id).select("*");

  if(error) throw error;
}