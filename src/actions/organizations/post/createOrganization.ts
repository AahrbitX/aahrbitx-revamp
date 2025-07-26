"use server";

import { createClient } from "@/utils/supabase/server";

export const createOrganization = async (data: {
  name: string;
  domain: string;
  email: string;
  address?: string;
  user_id: string;
}) => {
  const supabase = await createClient();

  const { data: OrgCreationData, error: OrgCreationErr } = await supabase
    .from("organisations")
    .insert({
      name: data.name,
      domain: data.domain,
      email: data.email,
      address: data.address,
    })
    .select("*")
    .single();

  if (OrgCreationErr) {
    throw new Error(OrgCreationErr.message);
  }

  const { error: OrgUserMapErr } = await supabase.from("org_user_map").insert({
    user_id: data.user_id,
    org_id: OrgCreationData.id,
    user_role: "superadmin",
    application_id: null,
  });

  if (OrgUserMapErr) {
    throw new Error(OrgUserMapErr.message);
  }

  console.log("Organization created successfully:", OrgCreationData);
  return OrgCreationData;
};
