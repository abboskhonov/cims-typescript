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
import { isAuthenticated } from "@/helpers/authHelpers"
import { useRouter } from "next/navigation"

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
  const error = useAuthStore((s) => s.error)
  const fetchUser = useAuthStore.getState().fetchUser
 const router = useRouter()
  const [checkedAuth, setCheckedAuth] = React.useState(false)

  React.useEffect(() => {
    // check for token first
    if (!isAuthenticated()) {
      setCheckedAuth(true)
      return
    }

    if (!user && !loading) {
      fetchUser().finally(() => setCheckedAuth(true))
    } else {
      setCheckedAuth(true)
    }
  }, [user, loading, fetchUser])

  if (!checkedAuth) {
    return <div></div>
  }

  if (!isAuthenticated()) {
    return (
      router.push("/login")
    )
  }

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
