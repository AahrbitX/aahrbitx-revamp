"use server";

import { AppUser } from "@/types/App.types";
import { createDBClient } from "@/utils/supabase/DBclient";

export const getOrganisationUsers = async (orgId: string) => {
  const supabase = createDBClient();

  const { data: OrgUsersData, error: OrgUserErr } = await supabase
    .from("user_organizations")
    .select("*")
    .eq("org_id", orgId)
    .not("application_id", "is", null);

  if (OrgUserErr) {
    console.error("Error fetching organization users:", OrgUserErr);
    return [];
  }

  const userIds = OrgUsersData.map((user) => user.user_id);

  const { data: appUsers, error: appUsersError } = await supabase
    .from("app_users_view")
    .select("*")
    .in("id", userIds);

  if (appUsersError) {
    console.error("Error fetching app users:", appUsersError);
    return [];
  }

  const appUsersById = Object.fromEntries(appUsers.map((u) => [u.id, u]));

  const joinedData = OrgUsersData.map((orgUser) => ({
    ...orgUser,
    app_user_data: (appUsersById[orgUser.user_id!] as AppUser) || null,
  }));

  return joinedData;
};
