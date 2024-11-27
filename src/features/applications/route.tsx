import {Route} from "react-router";
import ApplicationsPage from "@/features/applications/pages/applications-page.tsx";

const applicationsRoutes = (
  <>
    <Route path={"/applications"} element={<ApplicationsPage/>}/>
  </>
)

export default applicationsRoutes;