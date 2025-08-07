"use server";

import { headers } from "next/headers";

const EMAIL_SERVICE_URL = process.env.EMAIL_SERVICE_URL || "";

export const sendAppInvite = async ({
  email,
  organization_id,
  application_id,
}: {
  email: string;
  organization_id: string;
  application_id: string;
}) => {
  const headersList = await headers();
  const domain = headersList.get("host");

  const link = `${domain}/auth/verify-invite?orgid=${organization_id}&appid=${application_id}&email=${email}`;

  console.log("Sending app invite email to:");

  const response = await fetch(`${EMAIL_SERVICE_URL}/email/send-invite`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      to: [email],
      subject: "You have been invited to join an application",
      context: {
        invitationLink: link,
      },
    }),
  });

  const { data, error } = await response.json();

  if (error) {
    console.error("Error sending app invite email:", error);
    throw new Error("Failed to send app invite email");
  }

  return data;
};
