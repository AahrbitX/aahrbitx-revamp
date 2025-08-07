"use server";

import { createDBClient } from "@/utils/supabase/DBclient";
import { sendInviteMail } from "../email/send-invite-mail";
import { checkUserAvailablity } from "@/actions/user/check-user-availablity";
import { sendAppInvite } from "../email/send-app-invite";

export const inviteAppUser = async ({
  email,
  organization_id,
  applicationId,
  invitedBy,
}: {
  email: string;
  organization_id: string;
  applicationId: string;
  invitedBy: string;
}) => {
  // 1.send email to the user to invite them to the app
  try {
    const userExists = await checkUserAvailablity(email);

    console.log("User exists:", userExists);

    if (!userExists) {
      await sendInviteMail({
        organization_id: organization_id,
        application_id: applicationId,
        email,
      });
    } else {
      await sendAppInvite({
        organization_id: organization_id,
        application_id: applicationId,
        email,
      });
    }

    // 2.create new entry in the database for the user
    const supabase = createDBClient();

    const { error } = await supabase.from("app_invites").insert({
      email: email,
      role: "admin",
      status: "pending",
      app_id: applicationId,
      org_id: organization_id,
      invited_by: invitedBy,
    });

    if (error) {
      console.error("Error inserting invite into database:", error);
      throw new Error("Failed to create invite entry in the database");
    }
  } catch (error) {
    console.error("Error sending invite email:", error);
    throw new Error("Failed to send invite email");
  }
};
