import ListHeader from "@/components/list-header.tsx";
import {Outlet} from "react-router";

export default function ListLayout() {
  return (
    <div className="container min-h-screen mx-auto px-4 py-5">
      <ListHeader/>
      <Outlet/>
    </div>
  )
}