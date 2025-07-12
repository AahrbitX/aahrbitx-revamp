"use client"

import * as React from "react"
import {
  LayoutGrid,
  PieChart,
  Settings2,
  SquareTerminal,
  Users,
} from "lucide-react"

import { NavMain } from "./nav-main"
import { NavUser } from "./nav-user"
import { TeamSwitcher } from "./team-switcher"
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
      title: "Users",
      icon: Users,
      isActive: false,
      items: [
        {
          title: "All Users",
          url: "/dashboard/users",
        },
      ],
    },
    {
      title: "Products",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "All Products",
          url: "/dashboard/products",
        },
        {
          title: "Exora",
          url: "/dashboard/products/exora",
        },
      ],
    },
    {
      title: "Sales",
      icon: PieChart,
      isActive: true,
      items: [
        {
          title: "Templates",
          url: "/dashboard/templates",
        },
        {
          title: "Revenue",
          url: "/dashboard/revenue",
        },
      ],
    },
    {
      title: "Services",
      icon: LayoutGrid,
      isActive: false,
      items: [
        {
          title: "Web Designs",
          url: "/dashboard/services/web-designs",
        },
      ],
    },
    {
      title: "Settings",
      icon: Settings2,
      isActive: false,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
