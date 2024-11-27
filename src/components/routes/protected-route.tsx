import {Outlet, useNavigate} from "react-router";
import {useSession} from "@/hooks/useSession.tsx";
import {useEffect} from "react";

type Props = {
  publicOnly?: boolean
}

export default function ProtectedRoute({publicOnly}: Props) {
  const navigate = useNavigate();
  const {session, isLoading} = useSession();

  useEffect(() => {
    if (isLoading) return;

    if (!session) {
      navigate("/sign-in");
    } else if (publicOnly && session) {
      navigate("/");
    }
  }, [session, isLoading, publicOnly]);

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="h-8 w-8 animate-spin text-gray-500 dark:text-gray-400"/>
          <p className="text-gray-500 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <Outlet/>
  )
}