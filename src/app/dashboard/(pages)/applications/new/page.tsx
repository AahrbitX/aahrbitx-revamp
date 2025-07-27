"use client";

import { z } from "zod";
import Link from "next/link";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { useForm } from "@tanstack/react-form";
import { FieldError } from "@/utils/fieldErrors";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { getProducts } from "@/actions/products/getProducts";
import { useAuthOrg } from "@/providers/auth-org-provider";
import { createApplication } from "@/actions/organizations/post/createApplication";
import { createPayment } from "@/actions/payment/create-payment";
import { paymentOptions, prefillData } from "@/lib/payment";
import { verifyPayment } from "@/actions/payment/verify-payment";

const formSchema = z.object({
  appName: z.string().min(5, "Application name must be at least 5 characters"),
  orgId: z.string().min(1, "Select an organization"),
  subscribingProduct: z.string().min(1, "Select a product"),
  appPlan: z.string().min(1, "Select a plan"),
  appDescription: z.string().optional(),
});

function NewApplicationFormPage() {
  const {
    user: AppUser,
    userOrganizationData: userOrganizations,
    setUserOrganizationData,
  } = useAuthOrg();

  if (!AppUser) {
    return <div>Please log in to create an application.</div>;
  }

  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  const [productData, setProductData] = useState<any>(null);
  const [plans, setPlans] = useState<any[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);

  const form = useForm({
    defaultValues: {
      appName: "",
      orgId: "",
      subscribingProduct: "",
      appDescription: "",
      appPlan: "",
    },
    validators: {
      // @ts-ignore - schema validation
      onChange: formSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        // Step 1: Create payment
        const paymentCreationResponse = await createPayment({
          email: prefillData.email,
          phone: prefillData.phone,
          product_code: productData.code,
          product_name: productData.name,
          product_image: "https://example.com/image.png",
          amount: String(selectedPlan.price),
        });

        console.log("Payment creation response:", paymentCreationResponse);

        if (!paymentCreationResponse?.razorpay_order_id) {
          throw new Error("Invalid Razorpay order ID");
        }

        // Step 2: Ensure Razorpay is loaded
        if (typeof window === "undefined" || !(window as any).Razorpay) {
          throw new Error("Razorpay SDK not loaded");
        }

        const options = {
          ...paymentOptions,
          amount: Number(selectedPlan.price) * 100, // Razorpay expects paise
          name: productData.name,
          description: `${productData.name} - ₹${selectedPlan.price}`,
          theme: { color: "black" },
          order_id: paymentCreationResponse.razorpay_order_id,
          handler: async (res: any) => {
            console.log("Razorpay handler triggered with response:", res);

            try {
              await verifyPayment({
                razorpay_order_id: res.razorpay_order_id,
                razorpay_payment_id: res.razorpay_payment_id,
                razorpay_signature: res.razorpay_signature,
                transaction_id: paymentCreationResponse.transaction_id,
                email: prefillData.email,
                phone: prefillData.phone,
              });

              const orgViewRes = await createApplication({
                user: AppUser,
                appName: value.appName,
                orgId: value.orgId,
                subscribedProduct: value.subscribingProduct,
                appDescription: value.appDescription,
                appPlan: value.appPlan,
              });

              setUserOrganizationData((prev) => [...prev, orgViewRes]);

              toast.success("Application created successfully!", {
                description: "You can now manage your application.",
              });
            } catch (err) {
              console.error(
                "Error verifying payment or creating application:",
                err
              );
              toast.error("Payment verification failed");
            }
          },
        };

        console.log("Razorpay options prepared:", options);

        const razorpay = new (window as any).Razorpay(options);
        razorpay.open();

        razorpay.on("payment.failed", function (err: any) {
          console.error("Payment failed:", err);
          toast.error("Payment was cancelled or failed");
        });
      } catch (err) {
        console.error("Error in payment submission:", err);
        toast.error(JSON.stringify(err));
      }
    },
  });

  const handleProductSelect = (product: any) => {
    setProductData(product);
    setPlans(product.price);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await getProducts();
        if (res) setProducts(res);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const userOrganizationsOptions = userOrganizations.reduce((acc, org) => {
    acc[org.org_id!] = org.organization_name!;
    return acc;
  }, {} as Record<string, string>);

  return (
    <div className="p-6 rounded-lg shadow max-w-lg">
      <h2 className="text-xl font-bold text-white mb-4">
        Create New Application
      </h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="space-y-4"
      >
        {/* Application Name */}
        <form.Field name="appName">
          {(field) => (
            <div>
              <Label
                htmlFor={field.name}
                className="text-muted-foreground mb-1 block"
              >
                Application Name
              </Label>
              <Input
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              <FieldError field={field} />
            </div>
          )}
        </form.Field>

        {/* Organization & Product */}
        <div className="grid grid-cols-2 gap-4">
          <form.Field name="orgId">
            {(field) => (
              <div>
                <Label
                  htmlFor={field.name}
                  className="text-muted-foreground mb-1 block"
                >
                  Organization
                </Label>
                <Select
                  value={field.state.value}
                  onValueChange={(val) => field.handleChange(val)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Organization" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(userOrganizationsOptions).map(
                      ([value, label]) => (
                        <SelectItem key={value} value={value}>
                          {label}
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>
                <FieldError field={field} />
              </div>
            )}
          </form.Field>

          <form.Field name="subscribingProduct">
            {(field) => (
              <div>
                <Label
                  htmlFor={field.name}
                  className="text-muted-foreground mb-1 block underline"
                >
                  <Link href="/products">Products</Link>
                </Label>
                <Select
                  disabled={loading}
                  value={field.state.value}
                  onValueChange={(val) => {
                    field.handleChange(val);
                    const selected = products.find((p) => p.id === val);
                    if (selected) handleProductSelect(selected);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Product" />
                  </SelectTrigger>
                  <SelectContent>
                    {products.map((product) => (
                      <SelectItem key={product.id} value={product.id}>
                        {product.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FieldError field={field} />
              </div>
            )}
          </form.Field>
        </div>

        {/* Plan */}
        <form.Field name="appPlan">
          {(field) => (
            <div>
              {plans.length > 0 && (
                <Label
                  htmlFor={field.name}
                  className="text-muted-foreground mb-2 block"
                >
                  Plan
                </Label>
              )}
              <RadioGroup
                value={field.state.value}
                onValueChange={(val) => {
                  field.handleChange(val);
                  const selected = plans.find((p) => p.name === val);
                  if (selected) setSelectedPlan(selected);
                }}
                className="flex gap-4"
              >
                {plans.map((plan) => (
                  <div
                    key={plan.name}
                    className="flex items-center gap-2  p-2 rounded-lg"
                  >
                    <RadioGroupItem value={plan.name} id={plan.name} />
                    <Label htmlFor={plan.name}>
                      {plan.name} - ₹{plan.price} / {plan.validity_months} month
                    </Label>
                  </div>
                ))}
              </RadioGroup>
              <FieldError field={field} />
            </div>
          )}
        </form.Field>

        {/* Description */}
        <form.Field name="appDescription">
          {(field) => (
            <div>
              <Label
                htmlFor={field.name}
                className="text-muted-foreground mb-1 block"
              >
                Description
              </Label>
              <Textarea
                placeholder="Optional"
                rows={3}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              <FieldError field={field} />
            </div>
          )}
        </form.Field>

        {/* Submit */}
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
        >
          {([canSubmit, isSubmitting]) => (
            <Button
              className="float-end"
              type="submit"
              disabled={
                !canSubmit || !plans.length || !productData || !selectedPlan
              }
            >
              {isSubmitting ? "Creating..." : "Create Application"}
            </Button>
          )}
        </form.Subscribe>
      </form>
    </div>
  );
}

export default NewApplicationFormPage;
