"use server";

import { createClient } from "@/utils/supabase/server";
import { getOrganisationUsers } from "../getOrganizationUsers";

export const deleteOrganization = async (userId: string, orgId: string) => {
  const supabase = await createClient();

  const orgUsers = await getOrganisationUsers(orgId);
  if (!orgUsers?.length) throw new Error("Organization not found");

  const isSuperadmin = orgUsers.some(
    (user) => user.user_id === userId && user.user_role === "superadmin"
  );

  if (!isSuperadmin) throw new Error("Unauthorized");

  const { data, error } = await supabase
    .from("organisations")
    .delete()
    .eq("id", orgId);

  return { data, error };
};
