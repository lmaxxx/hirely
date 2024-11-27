import SignInForm from "@/features/auth/components/sign-in-form";
import {BackgroundBeamsWithCollision} from "@/components/ui/background-beams-with-collision.tsx";

export default function SignInPage() {
  return (
    <BackgroundBeamsWithCollision className={"min-h-screen w-full"}>
      <div className={"w-full h-screen flex items-center justify-evenly z-[51]"}>
        <div className={"rounded-xl border bg-card shadow p-12"}>
          <h1 className={"text-9xl italic font-bold"}>Hirely</h1>
          <p className={"text-2xl text-zinc-600 mt-3"}>AI-Powered hiring tool for recruiters</p>
        </div>
        <SignInForm/>
      </div>
    </BackgroundBeamsWithCollision>
  )
}