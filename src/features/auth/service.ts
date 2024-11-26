import supabase from "@/lib/supabase.ts";
import {SignInWithPasswordCredentials} from "@supabase/supabase-js";
import * as z from "zod";
import {formSchema as signUpFormSchema} from "@/features/auth/components/sign-up-form.tsx";

export async function signUp(credentials: z.infer<typeof signUpFormSchema>) {
  const fullCredentials = {
    email: credentials.email,
    password: credentials.password,
    options: {
      data: {
        name: credentials.name
      }
    }
  }
  const {data, error} = await supabase.auth.signUp(fullCredentials);
  if(error) throw error;

  return data;
}

export async function signIn(credentials: SignInWithPasswordCredentials) {
  const {data, error} = await supabase.auth.signInWithPassword(credentials);
  if (error) throw error;

  return data;
}

export async function signOut() {
  const {error} = await supabase.auth.signOut();
  if(error) throw error;
}