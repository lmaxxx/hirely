import {Route, Routes} from "react-router";
import ProtectedRoute from "@/components/routes/protected-route.tsx";
import SignInPage from "@/features/auth/pages/sign-in-page.tsx";
import SignUpPage from "@/features/auth/pages/sign-up-page.tsx";
import Landing from "@/landing.tsx";
import ApplicationsPage from "@/features/applications/pages/applications-page.tsx";
import ListLayout from "@/layouts/list-layout.tsx";
import CompaniesPage from "@/features/companies/pages/companies-page.tsx";
import DashboardLayout from "@/layouts/dashboard-layout.tsx";

export default function CombinedRoutes() {
  return (
    <Routes>
      <Route path={"/"} element={<Landing/>}>
      </Route>

      <Route element={<ProtectedRoute publicOnly />}>
        <Route path={"sign-in"} element={<SignInPage/>}/>
        <Route path={"sign-up"} element={<SignUpPage/>}/>
      </Route>
      <Route element={<ProtectedRoute/>}>
        <Route path={"list"} element={<ListLayout/>}>
          <Route path={"applications"} element={<ApplicationsPage/>}/>
          <Route path={"companies"} element={<CompaniesPage/>}/>
        </Route>
        <Route path={"dashboard/:applicationId"} element={<DashboardLayout/>}>
          <Route index />
          <Route path={"template"}/>
          <Route path={"submissions"}/>
          <Route path={"reviewer"}/>
          <Route path={"statistics"}/>
          <Route path={"settings"}/>
        </Route>
      </Route>
    </Routes>
  )
}