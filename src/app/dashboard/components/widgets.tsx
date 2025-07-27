"use client";

import "ldrs/react/Hatch.css";
import "ldrs/react/Spiral.css";
import "ldrs/react/Trefoil.css";

import React, { useEffect, useState } from "react";
import { Trefoil } from "ldrs/react";
import { Spiral } from "ldrs/react";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { getWidgetData } from "@/actions/organizations/widgetsData";
import { useAuthOrg } from "@/providers/auth-org-provider";
import { UserOrganizationType } from "@/types/organizations/Organization";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export function UserOrganizationWidget() {
  const { user } = useAuthOrg();
  const [organizations, setOrganizations] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) return;
    const fetchData = async () => {
      const { organizations } = await getWidgetData(user?.id!);
      setOrganizations(organizations);
      setLoading(false);
    };
    fetchData();
  }, [user?.id]);

  // This widget can be used to display user organization information.
  return (
    <div className="p-4 bg-muted rounded-lg shadow @2xl:row-span-2 flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Your Organizations</h2>
        <Button variant="outline" size="icon" className="h-8 w-8" asChild>
          <Link href="/dashboard/organisations/new">
            <PlusIcon />
          </Link>
        </Button>
      </div>
      {loading ? (
        <div className="grow flex items-center justify-center">
          <Trefoil size="28" stroke="4" speed="3.5" color="grey" />
        </div>
      ) : (
        <div className="grow flex items-start justify-start gap-2">
          {organizations.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              You are not a member of any organization.
            </p>
          ) : (
            <ul className="space-y-2 w-full">
              {organizations.map((org: UserOrganizationType) => (
                <li
                  key={org.org_id}
                  className="border border-gray-300 dark:border-neutral-700 px-3 py-2 rounded-lg hover:bg-white dark:hover:bg-neutral-700 transition-colors duration-200 cursor-pointer"
                >
                  <Link
                    href={`/dashboard/organisations/${org.org_id}`}
                    className="block w-full font-medium"
                  >
                    {org.organization_name}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export function UserApplicationWidget() {
  const { user } = useAuthOrg();

  const [applications, setApplications] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) return;
    const fetchData = async () => {
      const { internal_applications, external_applications } =
        await getWidgetData(user?.id!);
      setApplications([
        ...internal_applications.map((app) => ({ ...app, source: "internal" })),
        ...external_applications.map((app) => ({ ...app, source: "external" })),
      ]);
      console.log("user apps", internal_applications, external_applications);
      setLoading(false);
    };
    fetchData();
  }, [user?.id]);

  const validApplications = applications.filter(
    (app: any) => app.application_id && app.application_name
  );

  return (
    <div className="p-4 bg-muted rounded-lg shadow @2xl:col-span-2 flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Your Applications</h2>
        {validApplications.length > 0 && (
          <Button variant="outline" size="icon" className="h-8 w-8" asChild>
            <Link href="/dashboard/applications/new">
              <PlusIcon />
            </Link>
          </Button>
        )}
      </div>
      {loading ? (
        <div className="grow flex items-center justify-center">
          <Trefoil size="28" stroke="4" speed="3.5" color="grey" />
        </div>
      ) : (
        <div className="grow flex items-start justify-start">
          {validApplications.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              You have not applied to any organizations.
            </p>
          ) : (
            <ul className="space-y-2 w-full">
              {validApplications.map(
                (app: UserOrganizationType & { source: string }) => (
                  <li
                    key={app.application_id}
                    className=" border border-gray-300 dark:border-neutral-700 px-3 py-2 rounded-lg hover:bg-white dark:hover:bg-neutral-700 transition-colors duration-200 cursor-pointer"
                  >
                    <Link
                      className="flex items-center justify-between"
                      href={`/dashboard/applications/${app.application_id}`}
                    >
                      <span className="font-medium">
                        {app.application_name}
                      </span>
                      <Badge
                        className={
                          app.source === "internal"
                            ? "bg-emerald-500/50 border-emerald-500 border-2 text-emerald-100"
                            : "bg-red-500/50 border-red-500 border-2 text-red-100"
                        }
                      >
                        {app.source}
                      </Badge>
                    </Link>
                  </li>
                )
              )}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export function UserNotificationWidget() {
  // This widget can be used to display user notifications.
  return (
    <div className="p-4 bg-muted rounded-lg shadow @md:col-span-2 flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Your Notifications</h2>
      </div>
      <div className="grow flex items-center justify-center">
        <Spiral size="40" speed="0.9" color="grey" />
      </div>
    </div>
  );
}
