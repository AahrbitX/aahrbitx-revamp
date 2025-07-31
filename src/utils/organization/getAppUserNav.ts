"use client";

import { AppUserNavType } from "@/app/dashboard/components/app-sidebar";
import { UserOrganizationType } from "@/types/organizations/Organization";
import { transformOrgNavToAppNav } from "@/utils/organization/transformOrgNavToAppNav";
import { Users } from "lucide-react";

export const getAppUserNav = ({
  currentSelector,
  userOrganizationData,
}: {
  currentSelector: UserOrganizationType | null;
  userOrganizationData: UserOrganizationType[];
}): AppUserNavType[] => {
  // if no current selector, return empty array
  if (!currentSelector) return [];

  // Find the matched organization
  const matchedSelectorContent = userOrganizationData.filter(
    (org) => org.org_id === currentSelector.org_id
  );

  // if no matched organization, return empty array
  if (!matchedSelectorContent.length) return [];

  const finalNav = matchedSelectorContent.flatMap((org) => {
    if (!org.application_id && !org.application_name) return [];

    const {
      nav_sidebar,
      nav_sidebar_admin,
      user_role,
      application_id,
      subscribed_product_name,
    } = org;

    const navToTransform =
      user_role === "admin"
        ? transformOrgNavToAppNav(
            nav_sidebar_admin,
            subscribed_product_name!,
            application_id!
          )
        : transformOrgNavToAppNav(
            nav_sidebar,
            subscribed_product_name!,
            application_id!
          );

    return navToTransform;
  });

  if (currentSelector.user_role === "superadmin") {
    finalNav.push({
      title: "Users",
      icon: Users,
      isActive: false,
      items: [
        {
          title: "All Users",
          url: `/dashboard/organisations/${currentSelector.org_id}/users`,
        },
        {
          title: "Invite User",
          url: `/dashboard/organisations/${currentSelector.org_id}/invite`,
        },
      ],
    });
  }

  return finalNav;
};
