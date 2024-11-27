import {Route, Routes} from "react-router";
import ProtectedRoute from "@/components/routes/protected-route.tsx";
import {useSession} from "@/hooks/useSession.tsx";
import SignInPage from "@/features/auth/pages/sign-in-page.tsx";
import SignUpPage from "@/features/auth/pages/sign-up-page.tsx";
import Landing from "@/landing.tsx";
import ApplicationsPage from "@/features/applications/pages/applications-page.tsx";

export default function CombinedRoutes() {
  const session = useSession();

  return (
    <Routes>
      <Route path={"/"} element={<Landing/>}></Route>
      <Route element={<ProtectedRoute publicOnly />}>
        <Route path={"sign-in"} element={<SignInPage/>}></Route>
        <Route path={"sign-up"} element={<SignUpPage/>}></Route>
      </Route>
      <Route element={<ProtectedRoute/>}>
        <Route path={"/applications"} element={<ApplicationsPage/>}/>
      </Route>
    </Routes>
  )
}