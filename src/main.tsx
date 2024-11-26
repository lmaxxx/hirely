import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {BrowserRouter} from "react-router";
import CombinedRoutes from "@/combined-routes";
import { Toaster } from "@/components/ui/toaster"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <CombinedRoutes/>
      <Toaster/>
    </BrowserRouter>
  </StrictMode>,
)
