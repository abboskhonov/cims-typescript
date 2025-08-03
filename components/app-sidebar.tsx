"use client"

import * as React from "react"
import {
  IconDashboard,
  IconChartBar,
  IconReport,
  IconCreditCard,
  IconBrandWordpress,
} from "@tabler/icons-react"
import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import useAuthStore from "@/stores/useAuthStore"

const navMain = [
  { title: "Dashboard", url: "/dashboard", icon: IconDashboard },
  { title: "Sales", url: "/sales", icon: IconChartBar },
  { title: "Finance", url: "/finance", icon: IconReport },
  { title: "Payment", url: "/payment", icon: IconCreditCard },
  { title: "WordPress", url: "/wordpress", icon: IconBrandWordpress },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const user = useAuthStore((s) => s.user)
  const loading = useAuthStore((s) => s.loading)
  const fetchUser = useAuthStore.getState().fetchUser // stable reference

  React.useEffect(() => {
    if (!user && !loading) {
      fetchUser()
    }
  }, [user, loading]) // no fetchUser in deps because it's stable

  const displayUser = {
    name: user ? `${user.name} ${user.surname}` : "Loading...",
    email: user?.email ?? "",
    avatar: "/avatars/default.jpg",
  }

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <span className="text-base font-semibold">Cognilabs</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={navMain} />
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={displayUser} />
      </SidebarFooter>
    </Sidebar>
  )
}
