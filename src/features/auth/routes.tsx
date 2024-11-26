import {Route} from "react-router";
import SignInPage from "@/features/auth/pages/sign-in-page.tsx";
import SignUpPage from "@/features/auth/pages/sign-up-page.tsx";

const authRoutes = (
  <>
    <Route path={"sign-in"} element={<SignInPage/>}></Route>
    <Route path={"sign-up"} element={<SignUpPage/>}></Route>
  </>
)

export default authRoutes;