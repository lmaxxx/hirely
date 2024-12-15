import {
  Sidebar,
  SidebarContent, SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader, SidebarInset, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider
} from "@/components/ui/sidebar.tsx";
import {ArrowLeft, Calendar, Home, Inbox, Search, Settings} from "lucide-react";
import {NavLink, Outlet} from "react-router";

const items = [
  {
    title: "Dashboard",
    url: ".",
    icon: Home,
  },
  {
    title: "Template",
    url: "./template",
    icon: Inbox,
  },
  {
    title: "Submissions",
    url: "./submissions",
    icon: Calendar,
  },
  {
    title: "CV reviewer",
    url: "./reviewer",
    icon: Search,
  },
  {
    title: "Statistics",
    url: "./statistics",
    icon: Search,
  },
  {
    title: "Settings",
    url: "./settings",
    icon: Settings,
  },
]
// TODO: refactor this component
export default function DashboardLayout() {

  return (
    <div className={"min-h-screen w-full"}>
      <SidebarProvider>
        <Sidebar>
          <SidebarHeader>
            <h1 className={"text-2xl font-bold"}>Hirely</h1>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <NavLink
                          end={item.title === "Dashboard"}
                          to={item.url}
                          className={({isActive}) => isActive ? "213" : ""}
                        >
                          {/*{({ isActive }) => (*/}
                          {/*  <>*/}
                              <item.icon/>
                              <span>{item.title}</span>
                              {/*{isActive && <p>active</p>}*/}
                          {/*  </>*/}

                          {/*)}*/}
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <NavLink to={"/list/applications"}>
                      <ArrowLeft/>
                      <span>All applications</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset>
          <Outlet/>
        </SidebarInset>
      </SidebarProvider>
    </div>
  )
}