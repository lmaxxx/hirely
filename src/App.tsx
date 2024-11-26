import CombinedRoutes from "@/combined-routes.tsx";
import {Bounce, ToastContainer} from "react-toastify";

import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  return (
    <>
      <CombinedRoutes/>
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