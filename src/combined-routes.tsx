import {Route, Routes} from "react-router";
import ProtectedRoute from "@/components/routes/protected-route.tsx";
import SignInPage from "@/features/auth/pages/sign-in-page.tsx";
import SignUpPage from "@/features/auth/pages/sign-up-page.tsx";
import Landing from "@/landing.tsx";
import ApplicationsPage from "@/features/applications/pages/applications-page.tsx";
import ListLayout from "@/layouts/list-layout.tsx";
import CompaniesPage from "@/features/companies/pages/companies-page.tsx";
import DashboardLayout from "@/layouts/dashboard-layout.tsx";
import ApplicationSettingsPage from "@/features/application-settings/pages/application-settings-page.tsx";
import TemplatePage from "@/features/template/pages/template-page.tsx";
import SubmissionsPage from "@/features/submissions/pages/submissions-page.tsx";
import ReviewerPage from "@/features/reviewer/pages/reviewer-page.tsx";
import StatisticsPage from "@/features/statistics/pages/statistics-page.tsx";
import DashboardPage from "@/features/dashboard/pages/dashboard-page.tsx";

export default function CombinedRoutes() {
  return (
    <Routes>
      <Route path={"/"} element={<Landing/>}/>
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
          <Route index element={<DashboardPage/>} />
          <Route path={"template"} element={<TemplatePage/>}/>
          <Route path={"submissions"} element={<SubmissionsPage/>}/>
          <Route path={"reviewer"} element={<ReviewerPage/>}/>
          <Route path={"statistics"} element={<StatisticsPage/>}/>
          <Route path={"settings"} element={<ApplicationSettingsPage/>}/>
        </Route>
      </Route>
    </Routes>
  )
}