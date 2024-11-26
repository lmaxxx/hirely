import supabase from "@/lib/supabase.ts";
import {SignInWithPasswordCredentials, SignUpWithPasswordCredentials} from "@supabase/supabase-js";

export async function signUp(credentials: SignUpWithPasswordCredentials) {
  const {data, error} = await supabase.auth.signUp(credentials);

  if(error) return {data, error};

  return await signIn(credentials);

}

export async function signIn(credentials: SignInWithPasswordCredentials) {
  return await supabase.auth.signInWithPassword(credentials)
}