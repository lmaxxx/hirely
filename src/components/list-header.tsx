import {useSession} from "@/hooks/useSession.tsx";

export default function ListHeader() {
  const {session} = useSession();

  return (
    <header className="flex justify-between items-center mb-8 border-b pb-4">
      <div className="flex items-center">
        <span className="text-xl font-semibold">Hirely</span>
      </div>
      <h1>{session?.user?.user_metadata?.name ?? "Nickname was not found"}</h1>
    </header>
  )
}