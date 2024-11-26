import CombinedRoutes from "@/combined-routes.tsx";
import {Bounce, ToastContainer} from "react-toastify";
import {SessionProvider} from "@/hooks/useSession.tsx";

import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  return (
    <>
      <SessionProvider>
        <CombinedRoutes/>
      </SessionProvider>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="light"
        transition={Bounce}
      />
    </>
  )
}