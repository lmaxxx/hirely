import {Route, Routes} from "react-router";
import authRoutes from "@/features/auth/routes";
import landingRoutes from "@/features/landing/routes";
import ProtectedRoute from "@/components/routes/protected-route.tsx";
import ABC from "@/ABC.tsx";
import {useSession} from "@/hooks/useSession.tsx";
import applicationsRoutes from "@/features/applications/route.tsx";

export default function CombinedRoutes() {
  const session = useSession();

  console.log(session)

  return (
    <Routes>
      <Route element={<ProtectedRoute publicOnly />}>
        {authRoutes}
      </Route>
      {landingRoutes}
      <Route element={<ProtectedRoute/>}>
        <Route path={"abc"} element={<ABC/>}/>
        {applicationsRoutes}
      </Route>
    </Routes>
  )
}