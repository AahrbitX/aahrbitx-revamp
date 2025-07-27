"use server";

import { createClient } from "@/utils/supabase/server";
import { getOrganisationUsers } from "../getOrganizationUsers";

export const deleteApplication = async ({
  userId,
  appId,
}: {
  userId: string;
  appId: string;
}) => {
  const supabase = await createClient();

  const { error } = await supabase
    .from("org_applications")
    .delete()
    .eq("id", appId);

  if (error) {
    console.error("Error deleting application:", error);
    throw new Error("Failed to delete application");
  }
};
