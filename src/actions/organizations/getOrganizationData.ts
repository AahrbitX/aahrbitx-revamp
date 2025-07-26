"use server";

import { createDBClient } from "@/utils/supabase/DBclient";

export const getOrganisationData = async (orgId?: string) => {
  const supabase = createDBClient();

  if (orgId) {
    const { data, error } = await supabase
      .from("organisations")
      .select("*")
      .eq("id", orgId)
      .single(); // Assuming orgId is unique

    if (error) {
      console.error("Error fetching organization by ID:", error);
      return null;
    }

    return [data];
  } else {
    const { data, error } = await supabase.from("organisations").select("*");

    if (error) {
      console.error("Error fetching all organizations:", error);
      return [];
    }

    return data || [];
  }
};
