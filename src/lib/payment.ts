export const prefillData = {
          email: "maneeshmaneesh391@gmail.com",
          phone: "9962080860"
        }

export const paymentOptions = {
key: process.env.NEXT_PUBLIC_RAZORPAY_KEY, // Your Razorpay key ID
key_secret: process.env.NEXT_PUBLIC_RAZORPAY_SECRET_KEY, // Your Razorpay secret key
Currency: "INR", // Currency for the payment
prefill: prefillData
};

