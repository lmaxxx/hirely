import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {Session} from "@supabase/supabase-js";
import supabase from "@/lib/supabase.ts";

const SessionContext = createContext<{
  session: Session | null , isLoading: boolean
}>({session: null, isLoading: true});

export function useSession() {
  return useContext(SessionContext);
}

export function SessionProvider({children}: {children: ReactNode}) {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      const {data: {session}} = await supabase.auth.getSession()
      setSession(session)
      setIsLoading(false)
    }

    fetchSession()
  }, []);

  useEffect( () => {
    const {data: {subscription}} = supabase.auth.onAuthStateChange((_, session) => {
      if(session) setSession(session);
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])


  return (
    <SessionContext.Provider value={{session, isLoading}}>
      {children}
    </SessionContext.Provider>
  )
}