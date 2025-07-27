"use server";

import { CreatePaymentRequest, CreatePaymentResponse } from "@/types/payment";

const paymentBackendUrl = process.env.NEXT_PUBLIC_PAYMENT_BACKEND_URL;

export const createPayment = async (
  req: CreatePaymentRequest
): Promise<CreatePaymentResponse> => {
  const response = await fetch(`${paymentBackendUrl}/create-payment/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req),
  });

  //   console.log("Payment creation response:", response);

  if (!response.ok) {
    throw new Error("Failed to create payment");
  }

  const responseBody = await response.json();

  return responseBody as CreatePaymentResponse;
};
