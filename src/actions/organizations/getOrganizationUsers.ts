"use server";

import { createDBClient } from "@/utils/supabase/DBclient";

export const getOrganisationUsers = async (orgId: string) => {
  const supabase = createDBClient();

  const { data, error } = await supabase
    .from("user_organizations")
    .select("*")
    .eq("org_id", orgId);

  if (error) {
    console.error("Error fetching organization users:", error);
    return [];
  }

  return data || [];
};
