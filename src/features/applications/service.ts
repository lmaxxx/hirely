import supabase from "@/lib/supabase.ts";
import {createFormSchema} from "@/features/applications/form-validation.ts";
import {z} from "zod";

export async function createApplication({position, company}: z.infer<typeof createFormSchema>, userId?: string) {
  if(!userId) throw new Error("Unauthorized user");
  const {error} = await supabase.from("application")
    .insert({
      position,
      author: userId,
      company: +company,
    })
  if(error) throw error;
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