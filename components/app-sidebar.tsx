"use client"

import * as React from "react"
import {
    AudioWaveform, BarChart3, Bell,
    BookOpen,
    Bot,
    Command,
    Frame,
    GalleryVerticalEnd, LayoutDashboard,
    Map,
    PieChart,
    Settings2,
    SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"


const data = {
    navMain: [
        {
            title: "Dashboard",
            url: "/dashboard",
            icon: LayoutDashboard,
            isActive: true,
            items: [
                {
                    title: "Overview",
                    url: "/dashboard/overview",
                },
                {
                    title: "Portfolio Summary",
                    url: "/dashboard/portfolio",
                },
                {
                    title: "Market Watchlist",
                    url: "/dashboard/watchlist",
                },
            ],
        },
        {
            title: "Analysis",
            url: "/analysis",
            icon: BarChart3,
            items: [
                {
                    title: "New Analysis",
                    url: "/analysis/new",
                },
                {
                    title: "History",
                    url: "/analysis/history",
                },
                {
                    title: "Starred Insights",
                    url: "/analysis/starred",
                },
            ],
        },
        {
            title: "Alerts",
            url: "/alerts",
            icon: Bell,
            items: [
                {
                    title: "Active Alerts",
                    url: "/alerts/active",
                },
                {
                    title: "Notifications",
                    url: "/alerts/notifications",
                },
                {
                    title: "Setup New Alert",
                    url: "/alerts/setup",
                },
            ],
        },
        {
            title: "Settings",
            url: "/settings",
            icon: Settings2,
            items: [
                {
                    title: "Profile",
                    url: "/settings/profile",
                },
                {
                    title: "Preferences",
                    url: "/settings/preferences",
                },
                {
                    title: "API Integrations",
                    url: "/settings/integrations",
                },
                {
                    title: "Billing & Subscription",
                    url: "/settings/billing",
                },
            ],
        },
    ],
};
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>

      <SidebarContent>
        <NavMain items={data.navMain} />

      </SidebarContent>
      <SidebarFooter>
        <NavUser  />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
