"use server";

import { createDBClient } from "@/utils/supabase/DBclient";

export const getUserDetails = async (
  userId: string,
  appName: string
): Promise<{
  user_role: string;
  org_id: number | string;
}> => {
  const supabase = createDBClient();

  const { data, error } = await supabase
    .from("user_organizations")
    .select("user_role, org_id")
    .eq("user_id", userId)
    .eq("application_name", appName)
    .single();

  if (error) {
    console.error("Error fetching user details:", error);
    return {
      user_role: "guest",
      org_id: -1,
    };
  }

  return {
    user_role: data.user_role || "guest",
    org_id: data.org_id || -1,
  };
};
