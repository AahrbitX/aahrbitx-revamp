"use server";

import { createDBClient } from "@/utils/supabase/DBclient";

export async function getOrganisationApps(orgId: string) {
  const supabase = createDBClient();
  const { data, error } = await supabase
    .from("org_applications")
    .select("*")
    .eq("org_id", orgId);

  if (error) {
    console.warn("Error fetching organization applications:", error);
    return [];
  }

  return data;
}
