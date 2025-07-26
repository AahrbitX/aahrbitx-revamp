"use client";

import React, { useEffect, useState } from "react";
import { getContrastColor } from "@/lib/getContrast";
import { TemplateProps } from "@/types/Marketplace";
import { Contact, ShoppingCart } from "lucide-react";
import { paymentOptions, prefillData } from "@/lib/payment";
import { createPayment } from "@/actions/payment/create-payment";
import { verifyPayment } from "@/actions/payment/verify-payment";

function ActionButtons({ template }: { template: TemplateProps }) {
  const primaryColor = template.colorSchema.find((s) => s.name === "primary");
  const secondaryColor = template.colorSchema.find(
    (s) => s.name === "secondary"
  );
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  const [paymentInitiated, setPaymentInitiated] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => setIsScriptLoaded(true);
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  if (!primaryColor || !secondaryColor) {
    return;
  }

  const options = paymentOptions;

  const handlePayment = async () => {
    try {
      setPaymentInitiated(true);

      const paymentCreationResponse = await createPayment({
        email: prefillData.email,
        phone: prefillData.phone,
        product_code: template.id,
        product_name: template.title,
        product_image: "https://example.com/image.png",
        amount: String(template.priceBreakdown.selfService[0].price),
      });

      const razorpay = new (window as any).Razorpay({
        ...options,
        amount: Number(template.priceBreakdown.selfService[0].price),
        name: template.title,
        description: `${template.title} - ${template.priceBreakdown.selfService[0].price}`,
        theme: { color: primaryColor.value },
        order_id: paymentCreationResponse.razorpay_order_id,
        handler: async (res: any) => {
          try {
            await verifyPayment({
              razorpay_order_id: res.razorpay_order_id,
              razorpay_payment_id: res.razorpay_payment_id,
              razorpay_signature: res.razorpay_signature,
              transaction_id: paymentCreationResponse.transaction_id,
              email: prefillData.email,
              phone: prefillData.phone,
            });
          } catch (err) {
            console.error("Payment verification failed:", err);
          }
        },
      });

      razorpay.open();
    } catch (err) {
      console.error("Payment initiation failed:", err);
    } finally {
      setPaymentInitiated(false);
    }
  };

  return (
    <div className="flex w-full gap-4 transition-colors duration-300 *:flex-1">
      <button
        onClick={
          isScriptLoaded
            ? handlePayment
            : () => alert("Payment system is loading...")
        }
        style={{ backgroundColor: secondaryColor?.value }}
        className="flex items-center justify-center gap-2 rounded-xl py-2 hover:opacity-85"
      >
        <Contact
          className="size-5"
          style={{ color: getContrastColor(secondaryColor?.value) }}
        />
        <span style={{ color: getContrastColor(secondaryColor?.value) }}>
          Contact us
        </span>
      </button>
      <button
        disabled={paymentInitiated}
        onClick={handlePayment}
        style={{ backgroundColor: primaryColor?.value }}
        className="flex items-center justify-center gap-2 rounded-xl py-2 hover:opacity-85 cursor-pointer"
      >
        {paymentInitiated ? (
          <span style={{ color: getContrastColor(primaryColor?.value) }}>
            Processing...
          </span>
        ) : (
          <>
            {" "}
            <ShoppingCart
              className="size-5"
              style={{ color: getContrastColor(primaryColor?.value) }}
            />
            <span style={{ color: getContrastColor(primaryColor?.value) }}>
              {template.priceBreakdown.selfService[0].price} &#x20b9;
            </span>
          </>
        )}
      </button>
    </div>
  );
}

export default ActionButtons;
