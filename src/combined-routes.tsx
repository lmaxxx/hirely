import {Routes} from "react-router";
import authRoutes from "@/features/auth/routes";
import landingRoutes from "@/features/landing/routes";
import {useSession} from "@/hooks/useSession.tsx";

export default function CombinedRoutes() {
  const session = useSession();

  console.log(session)

  return (
    <Routes>
      {authRoutes}
      {landingRoutes}
    </Routes>
  )
}