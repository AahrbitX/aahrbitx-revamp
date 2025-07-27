"use server";

import { AppUser } from "@/types/App.types";
import { createClient } from "@/utils/supabase/server";

export const createApplication = async ({
  user,
  appName,
  orgId,
  subscribedProduct,
  appDescription,
  appPlan,
}: {
  user: AppUser;
  appName: string;
  orgId: string;
  subscribedProduct: string;
  appDescription: string;
  appPlan: string;
}) => {
  const supabase = await createClient();

  //insert data into org_applications
  const { data: OrgAppRes, error: OrgAppErr } = await supabase
    .from("org_applications")
    .insert({
      application_name: appName,
      org_id: orgId,
      subscribed_product: subscribedProduct,
      plan: appPlan,
      description: appDescription,
    })
    .select("*")
    .single();

  // insert data into org_user_map
  const { data: OUMRes, error: OUMErr } = await supabase
    .from("org_user_map")
    .insert({
      user_id: user.id,
      user_role: "superadmin",
      application_id: OrgAppRes.id,
      org_id: OrgAppRes.org_id,
    })
    .select("*")
    .single();

  if (OrgAppErr) {
    console.error("Error creating application:", OrgAppErr);
    throw new Error("Failed to create application");
  }

  if (OUMErr) {
    console.error("Error creating organization user mapping:", OUMErr);
    throw new Error("Failed to create organization user mapping");
  }

  const { data: OrgViewRes, error: OrgViewErr } = await supabase
    .from("user_organizations")
    .select("*")
    .eq("org_id", OUMRes.org_id)
    .eq("application_id", OUMRes.application_id)
    .single();

  if (OrgViewErr) {
    console.error("Error creating organization view:", OrgViewErr);
    throw new Error("Failed to create organization view");
  }

  return OrgViewRes;
};
