import {Routes} from "react-router";
import authRoutes from "@/features/auth/routes";
import landingRoutes from "@/features/landing/routes";

export default function CombinedRoutes() {
  return (
    <Routes>
      {authRoutes}
      {landingRoutes}
    </Routes>
  )
}