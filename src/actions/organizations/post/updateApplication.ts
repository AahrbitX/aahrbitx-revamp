"use server";

import { AppUser } from "@/types/App.types";
import { createClient } from "@/utils/supabase/server";

export const updateApplication = async (
  appId: string,
  {
    appName,
    appDescription,
  }: {
    user: AppUser;
    appName: string;
    appDescription: string;
  }
) => {
  const supabase = await createClient();

  //insert data into org_applications
  const { data: OrgAppRes, error: OrgAppErr } = await supabase
    .from("org_applications")
    .update({
      application_name: appName,
      description: appDescription,
    })
    .eq("id", appId)
    .select("*")
    .single();

  if (OrgAppErr) {
    console.error("Error updating application:", OrgAppErr);
    throw new Error("Failed to update application");
  }

  const { data: OrgViewRes, error: OrgViewErr } = await supabase
    .from("user_organizations")
    .select("*")
    .eq("org_id", OrgAppRes.org_id)
    .eq("application_id", OrgAppRes.id)
    .single();

  if (OrgViewErr) {
    console.error("Error updating organization view:", OrgViewErr);
    throw new Error("Failed to update organization view");
  }

  return OrgViewRes;
};
