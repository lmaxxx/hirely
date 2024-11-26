import {Routes} from "react-router";
import authRoutes from "@/features/auth/routes";
import landingRoutes from "@/features/landing/routes";
import supabase from "@/lib/supabase.ts";
import {useEffect} from "react";

export default function CombinedRoutes() {
  function trackUserSession() {
    supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth event:', event);
      console.log('Session:', session);

      switch (event) {
        case 'SIGNED_IN':
          console.log('User signed in:', session?.user);
          break;
        case 'SIGNED_OUT':
          console.log('User signed out');
          break;
        case 'TOKEN_REFRESHED':
          console.log('Token refreshed:', session?.access_token);
          break;
        case 'USER_UPDATED':
          console.log('User information updated:', session?.user);
          break;
        // default:
        //   console.log('Unhandled auth event:', event);
      }
    });
  }

  useEffect(() => {
    trackUserSession();
  }, [])


  return (
    <Routes>
      {authRoutes}
      {landingRoutes}
    </Routes>
  )
}