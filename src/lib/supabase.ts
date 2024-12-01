import {createClient} from "@supabase/supabase-js";
import {Database} from "../../database.types.ts";

const supabase = createClient<Database>("https://dlvkdizppuukvvyjrjaa.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsdmtkaXpwcHV1a3Z2eWpyamFhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI1NjQ1MzcsImV4cCI6MjA0ODE0MDUzN30.uErRfukPC9qUMGGpzF_8Tc3Bmm0eeGR4R_9dv38PhOE");

export default supabase;