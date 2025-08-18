"use client"

import * as React from "react"
import {
  IconDashboard,
  IconChartBar,
  IconReport,
  IconCreditCard,
  IconBrandWordpress,
} from "@tabler/icons-react"
import { NavMain, type NavItem } from "@/components/nav-main"
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

// 👇 define all possible nav items with permissions
const navMain: NavItem[] = [
  { title: "Dashboard", url: "/dashboard", icon: IconDashboard, permission: "ceo" },
  { title: "Sales", url: "/sales", icon: IconChartBar, permission: "crm" },
  { title: "Finance", url: "/finance", icon: IconReport, permission: "finance_list" },
  { title: "Payment", url: "/payment", icon: IconCreditCard, permission: "payment_list" },
  { title: "WordPress", url: "/wordpress", icon: IconBrandWordpress, permission: "project_toggle" },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const user = useAuthStore((s) => s.user)
  const loading = useAuthStore((s) => s.loading)
  const fetchUser = useAuthStore.getState().fetchUser // stable ref

  // fetch user once if not loaded
  React.useEffect(() => {
    if (!user && !loading) {
      fetchUser()
    }
  }, [user, loading])

  const displayUser = {
    name: user ? `${user.name} ${user.surname}` : "Loading...",
    email: user?.email ?? "",
    avatar: "/avatars/default.jpg",
  }

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      {/* --- Header (logo / brand) --- */}
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

      {/* --- Main navigation (role-based) --- */}
      <SidebarContent>
        <NavMain items={navMain} />
      </SidebarContent>

      {/* --- User profile (footer) --- */}
      <SidebarFooter>
        <NavUser user={displayUser} />
      </SidebarFooter>
    </Sidebar>
  )
}
