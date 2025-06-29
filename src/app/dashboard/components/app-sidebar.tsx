"use client"

import * as React from "react"
import {
  LayoutGrid,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "./nav-main"
// import { NavProjects } from "./nav-projects"
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
      title: "Products",
      url: "/dashboard/products",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Exora",
          url: "/dashboard/products/exora",
        },
      ],
    },
    {
      title: "Sales",
      url: "#",
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
      url: "/dashboard/services",
      icon: LayoutGrid,
      isActive: true,
      items: [
        {
          title: "Web Designs",
          url: "/dashboard/services/web-designs",
        },
      ],
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings2,
      isActive: true,
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
        <TeamSwitcher  />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser  />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
