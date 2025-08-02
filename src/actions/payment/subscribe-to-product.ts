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

  //   console.log("Payment creation response:", response);

  if (!response.ok) {
    throw new Error("Failed to create subscription");
  }

  return;
};
