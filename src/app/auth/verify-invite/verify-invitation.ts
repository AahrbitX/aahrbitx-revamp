import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export async function acceptInviteFromRedirect({
  searchParams,
  otp,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
  otp: string;
}) {
  const email = searchParams.email as string;
  const app_id = searchParams.appid as string;
  const org_id = searchParams.orgid as string;
  const action = searchParams.action as string;

  if (!email || !app_id || !org_id || !action) {
    redirect("/auth/invalid-invite");
  }

  const updatingStatus =
    action === "accept" ? "accepted" : action === "reject" ? "rejected" : null;

  if (!updatingStatus) {
    redirect("/auth/invalid-invite");
  }

  const supabase = createClient();
  const { data: sessionData } = await supabase.auth.getUser();
  const user = sessionData.user;

  if (!user || user.email?.toLowerCase() !== email.toLowerCase()) {
    redirect("/auth/invalid-invite");
  }

  // Check valid invite
  const { data: invite, error: inviteErr } = await supabase
    .from("app_invites")
    .select("*")
    .eq("email", email.toLowerCase())
    .eq("app_id", app_id)
    .eq("status", "pending")
    .lte("expires_at", new Date().toISOString())
    .maybeSingle();

  if (!invite || inviteErr) {
    redirect("/auth/invalid-invite");
  }

  const { data: inviteFnData, error: inviteFnErr } = await supabase.rpc(
    "insertusertoapplicationfrominvite",
    {
      email: email.toLowerCase(),
      app_id: invite.app_id,
    }
  );

  if (inviteFnErr || !inviteFnData) {
    console.error(
      "Error inserting user to application from invite:",
      inviteFnErr
    );
    redirect("/auth/invalid-invite");
  }

  redirect("/dashboard/applications");
}
