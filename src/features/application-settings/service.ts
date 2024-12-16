import supabase from "@/lib/supabase.ts";
import {ApplicationUpdate} from "@/entities.type.ts";

export async function updateApplicationSettingsById(id: number, newData: ApplicationUpdate) {
  const {error, data} = await supabase.from("application")
    .update(newData)
    .eq("id", id)
    .select("*")
  if(error) throw error;
  return data[0];
}

export async function getApplicationSettings(id: number) {
  const {data, error} = await supabase.from("application").select("*").eq("id", id);
  if(error) throw error;

  return data[0];
}