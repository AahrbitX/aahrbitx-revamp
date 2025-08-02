export type CreatePaymentRequest = {
  user_id: string;
  org_id?: string;
  email: string;
  product_code: string;
  amount: string;
};

export type CreatePaymentResponse = {
  razorpay_order_id: string;
  transaction_id: string;
  amount: number;
  currency: string;
};

export type VerifyPaymentRequest = {
  email: string;
  user_id: string;
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  transaction_id: string;
};

export type VerifyPaymentRequestResponse = {};
