"use server";

const paymentBackendUrl = process.env.NEXT_PUBLIC_PAYMENT_BACKEND_URL;

export const subscribeToProduct = async (req: {
  org_id: string;
  app_id: string;
  transaction_id: string;
  plan_name: string;
}) => {
  const response = await fetch(`${paymentBackendUrl}/create-subscription/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req),
  });

  if (!response.ok) {
    console.error("Failed to create subscription:", response.statusText);
    const errorData = await response.json();
    console.error("Error details:", errorData);
    throw new Error("Failed to create subscription");
  }

  return;
};
