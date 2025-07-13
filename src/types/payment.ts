export type CreatePaymentRequest = {
    email:string;
    phone:string;
    product_code:string;
    product_name:string;
    product_image:string;
    amount:string;
}

export type CreatePaymentResponse = {
    razorpay_order_id: string,
    transaction_id: string,
    amount: number,
    currency: string
}

export type VerifyPaymentRequest = {
razorpay_order_id:string;
razorpay_payment_id:string;
razorpay_signature:string;
transaction_id:string;
email:string;
phone:string;
}

export type VerifyPaymentRequestResponse = {
    
}