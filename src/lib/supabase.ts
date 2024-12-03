import {createClient} from "@supabase/supabase-js";
import {Database} from "../../database.types.ts";
import {SUPABASE_ANON_KEY, SUPABASE_PROJECT_URL} from "&/env-variables.ts";



const supabase = createClient<Database>(
  SUPABASE_PROJECT_URL,
  SUPABASE_ANON_KEY
);

export default supabase;