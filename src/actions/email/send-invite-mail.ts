"use server";

import { headers } from "next/headers";
import { createServiceClient } from "@/utils/supabase/service-client";

export const sendInviteMail = async ({
  email,
  organization_id,
  application_id,
}: {
  email: string;
  organization_id: string;
  application_id: string;
}) => {
  // Create a Supabase client
  const supabase = createServiceClient();

  const headersList = await headers();
  const domain = headersList.get("host");

  //generate an invite mail
  const { data, error } = await supabase.auth.admin.generateLink({
    type: "invite",
    email: email,
    options: {
      redirectTo: `https://${domain}/auth/set-password?orgid=${organization_id}&appid=${application_id}&email=${email}&action=accept`,
    },
  });

  console.log("Generated Invite Data:", data);

  if (!data) throw Error("Unable to generate Invite Link");

  const generatedLink = new URL(data.properties?.action_link!);
  if (!generatedLink) throw Error("Unable to generate Invite Link");

  // change the link to the correct format
  generatedLink.searchParams.set(
    "redirect_to",
    `https://${domain}/auth/verify-email?orgid=${organization_id}&appid=${application_id}&email=${email}&action=accept`
  );

  console.log("Generated Invite Link:", generatedLink.toString());

  if (error) {
    console.error("Error sending invite email:", error);
    throw new Error("Failed to send invite email");
  }

  return data;
};
