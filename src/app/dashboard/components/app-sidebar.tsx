"use client"

import * as React from "react"
import {
  Globe,
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
          title: "Templates",
          url: "/dashboard/products/templates",
        }
      ],
    },
    {
      title:"Exora",
      icon: Globe,
      isActive: false,
      items: [
        {
          title:"Overview",
          url: "/dashboard/exora",
        },
        {
          title:"Inbox",
          url: "/dashboard/exora/inbox"
        },
        {
          title:"Billing",
          url: "/dashboard/exora/billing"
        },
        {
          title:"Channels",
          url: "/dashboard/exora/channels"
        },
        {
          title:"Reports",
          url: "/dashboard/exora/reports"
        },
      ]
    },
    {
      title: "Sales",
      icon: PieChart,
      isActive: false,
      items: [
        {
          title: "Revenue",
          url: "/dashboard/revenue",
        },
        {
          title: "Transactions",
          url: "/dashboard/transactions",
        },
      ],
    },
    {
      title: "Services",
      icon: LayoutGrid,
      isActive: false,
      items: [
        {
          title: "Products Service",
          url: "/dashboard/services/products-service",
        },
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
