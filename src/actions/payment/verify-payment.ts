"use server"

import { VerifyPaymentRequest, VerifyPaymentRequestResponse } from "@/types/payment"

export const verifyPayment = async (req: VerifyPaymentRequest) : Promise<VerifyPaymentRequestResponse> => {
    const paymentBackendUrl = process.env.NEXT_PUBLIC_PAYMENT_BACKEND_URL;

    const response = await fetch(`${paymentBackendUrl}/verify-payment/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(req)
    });

    if (!response.ok) {
        throw new Error("Failed to verify payment");
    }

    const responseBody = await response.json();

    return responseBody as VerifyPaymentRequestResponse;
}
