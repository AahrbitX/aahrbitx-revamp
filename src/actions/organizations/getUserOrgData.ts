"use server";

import { UserOrganizationType } from "@/types/organizations/Organization";
import { createDBClient } from "@/utils/supabase/DBclient";

export async function getUserOrgData(
  userId: string
): Promise<UserOrganizationType[]> {
  const supabase = createDBClient();
  const { data, error } = await supabase
    .from("user_organizations")
    .select("*")
    .eq("user_id", userId);

  if (error) {
    console.warn("Error fetching user organization data:", error);
    return [];
  }

  return data;
}
