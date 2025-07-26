"use server";

import { createDBClient } from "@/utils/supabase/DBclient";

export const getUserDetails = async (
  userId: string,
  appName: string
): Promise<{
  user_role: string;
  organization_id: number;
}> => {
  const supabase = createDBClient();

  const { data, error } = await supabase
    .from("organisation_user_view")
    .select("user_role, organization_id")
    .eq("user_id", userId)
    .eq("application_name", appName)
    .single();

  if (error) {
    console.error("Error fetching user details:", error);
    return {
      user_role: "guest",
      organization_id: -1,
    };
  }

  return {
    user_role: data.user_role || "guest",
    organization_id: data.organization_id || -1,
  };
};
