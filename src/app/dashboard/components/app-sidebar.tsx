"use client";

import * as React from "react";
import { LucideProps, Settings2 } from "lucide-react";

import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import { TeamSwitcher } from "./team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { defaultNavigations } from "@/lib/userNavigations";
import { useAuthOrg } from "@/providers/auth-org-provider";
import { getAppUserNav } from "@/utils/organization/getAppUserNav";

export type AppUserNavType = {
  title: string;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  isActive: boolean;
  items: {
    title: string;
    url: string;
  }[];
};

const defaultSettingsNav = {
  title: "Settings",
  icon: Settings2,
  isActive: false,
  items: [
    {
      title: "General",
      url: "/dashboard/general",
    },
    // {
    //   title: "Application",
    //   url: "#",
    // },
    // {
    //   title: "Billing",
    //   url: "#",
    // },
    // {
    //   title: "Limits",
    //   url: "#",
    // },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { currentSelector, userOrganizationData } = useAuthOrg();

  let userNavigations: AppUserNavType[] = [];

  const AppUserNavigations = getAppUserNav({
    userOrganizationData,
    currentSelector,
  });

  const UserRoleBasedNavigation: AppUserNavType[] = [];

  // Final User Navigations
  userNavigations = [
    ...AppUserNavigations,
    ...UserRoleBasedNavigation,
    ...defaultNavigations,
    defaultSettingsNav,
  ];

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={userNavigations} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
