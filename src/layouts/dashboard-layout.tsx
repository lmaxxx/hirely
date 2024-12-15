import {
  Sidebar,
  SidebarContent, SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader, SidebarInset, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider
} from "@/components/ui/sidebar.tsx";
import {
  ArrowLeft,
  BrainCircuit,
  ChartPie,
  Home,
  LayoutDashboard,
  Send,
  Settings
} from "lucide-react";
import {NavLink, Outlet, useLocation} from "react-router";

const items = [
  {
    title: "Dashboard",
    url: ".",
    icon: Home,
  },
  {
    title: "Template",
    url: "./template",
    icon: LayoutDashboard,
  },
  {
    title: "Submissions",
    url: "./submissions",
    icon: Send,
  },
  {
    title: "CV reviewer",
    url: "./reviewer",
    icon: BrainCircuit,
  },
  {
    title: "Statistics",
    url: "./statistics",
    icon: ChartPie,
  },
  {
    title: "Settings",
    url: "./settings",
    icon: Settings,
  },
]

export default function DashboardLayout() {
  const location = useLocation()
  const activeMenuTitle = items.slice(1)
    .find(item => location.pathname.includes(item.url.slice(1)))?.title ?? "Dashboard"

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
                      <SidebarMenuButton
                        isActive={activeMenuTitle === item.title}
                        asChild
                      >
                        <NavLink
                          end={item.title === "Dashboard"}
                          to={item.url}
                        >
                          <item.icon/>
                          <span>{item.title}</span>
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
                    All applications
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