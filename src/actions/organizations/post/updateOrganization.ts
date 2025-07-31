"use server";

import { createDBClient } from "@/utils/supabase/DBclient";

export const updateOrganization = async (
  id: string,
  data: {
    name: string;
    domain: string;
    email: string;
    address?: string;
    user_id: string;
  }
) => {
  const supabase = createDBClient();

  const { data: OrgUpdatedData, error: OrgUpdatedErr } = await supabase
    .from("organisations")
    .update({
      name: data.name,
      domain: data.domain,
      email: data.email,
      address: data.address,
    })
    .eq("id", id)
    .select("*")
    .single();

  if (OrgUpdatedErr) {
    throw new Error(OrgUpdatedErr.message);
  }

  const { data: userOrgData, error: userOrgErr } = await supabase
    .from("user_organizations")
    .select("*")
    .eq("user_id", data.user_id)
    .eq("org_id", OrgUpdatedData.id);

  if (userOrgErr) {
    throw new Error(userOrgErr.message);
  }

  return userOrgData;
};
