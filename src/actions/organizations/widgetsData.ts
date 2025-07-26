"use server";

import { getUserOrgData } from "./getUserOrgData";
import { UserOrganizationType } from "@/types/organizations/Organization";

export const getWidgetData = async (user_id: string) => {
  const userOrgData = await getUserOrgData(user_id);

  const result = userOrgData.reduce<{
    organizations: UserOrganizationType[];
    internal_applications: UserOrganizationType[];
    external_applications: UserOrganizationType[];
  }>(
    (acc, curr) => {
      if (curr.user_role === "superadmin") {
        const exists = acc.organizations.find((o) => o.org_id === curr.org_id);
        if (!exists) acc.organizations.push(curr);
        acc.internal_applications.push(curr);
      } else if (curr.user_role === "admin") {
        acc.external_applications.push(curr);
      }
      return acc;
    },
    { organizations: [], internal_applications: [], external_applications: [] }
  );

  return result;
};
