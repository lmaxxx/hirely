import {NavLink} from "react-router";

export default function LandingPage() {
  return (
    <div>
      Landing page

      <NavLink to={"/sign-in"}>
        Sign in
      </NavLink>
    </div>
  )
}