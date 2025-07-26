"use client";

import Link from "next/link";
import * as React from "react";
import { Atom, Plus, Building, AppWindow } from "lucide-react";
import { Separator } from "@radix-ui/react-separator";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

import { useRouter } from "next/navigation";
import { useAuthOrg } from "@/providers/auth-org-provider";
import { UserOrganizationType } from "@/types/organizations/Organization";

export function TeamSwitcher() {
  const { isMobile } = useSidebar();

  // get the user organization data from context
  const {
    userOrganizationData: teams,
    currentSelector: activeTeam,
    setCurrentSelector: setActiveTeam,
  } = useAuthOrg();

  // if no data in there use this as fallback
  const defaultTeam = () => (
    <>
      <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
        <Atom className="size-4" />
      </div>
      <div className="grid flex-1 text-left text-sm leading-tight">
        <span className="truncate font-medium">AahrbitX&deg;</span>
        <span className="truncate text-xs">Main Dashboard</span>
      </div>
    </>
  );

  // initialize route component
  const router = useRouter();

  // on each team change navigate to dashboard and the set the active team
  const handleTeamChange = (team: UserOrganizationType) => {
    router.replace("/dashboard");
    setActiveTeam(team);
  };

  // filtering the organisation where the user is superadmin and avoiding duplicates
  const organisations =
    teams
      ?.filter((org) => org.user_role === "superadmin")
      .reduce((acc: UserOrganizationType[], current) => {
        const exists = acc.find((o) => o.org_id === current.org_id);
        if (!exists) acc.push(current);
        return acc;
      }, []) || [];

  // filtering the organisation where the user is admin
  const applications = teams?.filter((org) => org.user_role === "admin") || [];

  // component
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              {activeTeam
                ? getTeamSelector({ team: activeTeam })
                : defaultTeam()}
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            {organisations.length > 0 && (
              <DropdownMenuLabel className="text-muted-foreground text-xs">
                Organisations
              </DropdownMenuLabel>
            )}

            {organisations.map((org, index) => (
              <DropdownMenuItem
                key={`org-${index}`}
                onClick={() => handleTeamChange(org)}
                className="gap-2 p-2"
              >
                {getTeamSelector({ team: org })}
                <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
              </DropdownMenuItem>
            ))}

            {applications.length > 0 && (
              <DropdownMenuLabel className="text-muted-foreground text-xs">
                Applications
              </DropdownMenuLabel>
            )}

            {applications.map((app, index) => (
              <DropdownMenuItem
                key={`app-${index}`}
                onClick={() => handleTeamChange(app)}
                className="gap-2 p-2"
              >
                {getTeamSelector({ team: app })}
                <DropdownMenuShortcut>
                  ⌘{index + 1 + applications.length}
                </DropdownMenuShortcut>
              </DropdownMenuItem>
            ))}

            <Separator className="my-1" />
            <DropdownMenuItem className="gap-2 p-2" asChild>
              <Link href="/dashboard/organisations/new">
                <div className="flex size-6 items-center justify-center rounded-md border">
                  <Plus className="size-3.5 shrink-0" />
                </div>
                New Organization
                <DropdownMenuShortcut>⌘N</DropdownMenuShortcut>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

// team selectors option component
const getTeamSelector = ({ team }: { team: UserOrganizationType }) => {
  const isApp = team.user_role === "admin";

  return (
    <>
      <div
        className={`flex aspect-square size-8 items-center justify-center rounded-lg ${
          isApp
            ? "bg-violet-100 text-violet-600"
            : "bg-yellow-100 text-yellow-600"
        }`}
      >
        {isApp ? (
          <AppWindow className="size-4" />
        ) : (
          <Building className="size-4" />
        )}
      </div>
      <div className="grid flex-1 text-left text-sm leading-tight">
        <span className="truncate font-medium">
          {isApp ? team.application_name : team.organization_name}
        </span>
        <span className="truncate text-xs">
          {isApp ? "Application" : "Organization"}
        </span>
      </div>
    </>
  );
};
