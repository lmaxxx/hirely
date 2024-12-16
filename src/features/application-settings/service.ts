import supabase from "@/lib/supabase.ts";

export async function updatePublishedState(id: number, isPublished: boolean) {
  const publishedAtValue = isPublished ? new Date().toISOString() : null;
  const {error} = await supabase.from("application")
    .update({published_at: publishedAtValue})
    .eq("id", id)
  if(error) throw error;
}

export async function getApplicationSettings(id: number) {
  const {data, error} = await supabase.from("application").select("*").eq("id", id);
  if(error) throw error;

  return data[0];
}