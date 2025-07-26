"use client";

import { AppUserNavType } from "@/app/dashboard/components/app-sidebar";
import { UserOrganizationType } from "@/types/organizations/Organization";
import { transformOrgNavToAppNav } from "@/utils/organization/transformOrgNavToAppNav";

export const getAppUserNav = ({
  currentSelector,
  userOrganizationData,
}: {
  currentSelector: UserOrganizationType | null;
  userOrganizationData: UserOrganizationType[];
}): AppUserNavType[] => {
  // if no current selector, return empty array
  if (!currentSelector) return [];

  if (!currentSelector.application_id || !currentSelector.application_name)
    return [];

  // Find the matched organization
  const matchedSelectorContent = userOrganizationData.filter(
    (org) => org.org_id === currentSelector.org_id
  );

  // if no matched organization, return empty array
  if (!matchedSelectorContent.length) return [];

  const safeParse = (json: unknown): any[] => {
    if (Array.isArray(json)) return json;
    if (typeof json === "string") {
      try {
        const parsed = JSON.parse(json);
        return Array.isArray(parsed) ? parsed : [];
      } catch {
        return [];
      }
    }
    return [];
  };

  const finalNav = matchedSelectorContent.flatMap((org) => {
    const { nav_sidebar, nav_sidebar_admin, user_role, subscribed_product } =
      org;

    const navToTransform =
      user_role === "admin"
        ? transformOrgNavToAppNav(nav_sidebar_admin, subscribed_product!)
        : transformOrgNavToAppNav(nav_sidebar, subscribed_product!);

    return navToTransform;
  });

  console.log(finalNav);

  return finalNav;
};
