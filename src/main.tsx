import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {BrowserRouter} from "react-router";
import CombinedRoutes from "@/combined-routes";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <CombinedRoutes/>
    </BrowserRouter>
  </StrictMode>,
)
