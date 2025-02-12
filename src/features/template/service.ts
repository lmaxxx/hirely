import supabase from "@/lib/supabase.ts";

export async function fetchTemplateByApplicationId(applicationId?: string) {
  if(!applicationId) throw new Error("Application id is required");
  console.log(applicationId)

  const {data, error} = await supabase.from("field")
    .select("*")
    .eq("application", applicationId)
    .order("order")

  if(error) throw error;

  return data;
}
