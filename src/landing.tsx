import {NavLink} from "react-router";
import {Button} from "@/components/ui/button.tsx";
import {signOut} from "@/features/auth/service.ts";

export default function Landing() {

  async function onClick() {
    await signOut();
  }

  return (
    <div>
      Landing page

      <NavLink to={"/sign-in"}>
        <Button>Sign in</Button>
      </NavLink>
      <Button onClick={onClick}>Sign out</Button>
    </div>
  )
}