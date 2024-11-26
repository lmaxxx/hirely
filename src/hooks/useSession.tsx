import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {Session} from "@supabase/supabase-js";
import supabase from "@/lib/supabase.ts";

const SessionContext = createContext<Session | null>(null);

export function useSession() {
  return useContext(SessionContext);
}

export function SessionProvider({children}: {children: ReactNode}) {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const {data: {subscription}} = supabase.auth.onAuthStateChange((_, session) => {
      setSession(session);
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])


  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  )
}