import {Route} from "react-router";
import LandingPage from "@/features/landing/landing-page";

const landingRoutes = (
  <Route path={"/"} element={<LandingPage/>}></Route>
)

export default landingRoutes;