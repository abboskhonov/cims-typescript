import { AppSidebar } from '@/components/app-sidebar'
import CardBalances from '@/components/bank-cards'
import  ExchangeRate  from '@/components/exchange-rate'
import { PermissionGuard } from '@/components/permissionGuard'
import { SectionCards } from '@/components/section-cards'
import { SiteHeader } from '@/components/site-header'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import React from 'react'

const page = () => {
  return (
    <PermissionGuard required={"finance_list"}>
     <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="sidebar" />
      <SidebarInset>
      <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
             
             <CardBalances />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
    </PermissionGuard>
  )
}

export default page
