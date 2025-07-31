"use server";

import { createDBClient } from "@/utils/supabase/DBclient";

export const getApplicationData = async (appId?: string) => {
  const supabase = createDBClient();

  if (appId) {
    const { data, error } = await supabase
      .from("org_applications")
      .select("*")
      .eq("id", appId)
      .single(); // Assuming appId is unique

    if (error) {
      console.error("Error fetching application by ID:", error);
      return null;
    }

    return [data];
  } else {
    const { data, error } = await supabase.from("org_applications").select("*");
    if (error) {
      console.error("Error fetching all applications:", error);
      return [];
    }
    return data || [];
  }
};
