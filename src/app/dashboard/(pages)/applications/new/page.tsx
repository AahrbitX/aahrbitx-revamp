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

function NewApplicationFormPage() {
  const { user: AppUser, userOrganizationData: userOrganizations } =
    useAuthOrg();

  const formSchema = z.object({
    appName: z
      .string()
      .min(
        5,
        "Application name is required and should be at least 5 characters long"
      ),
    orgName: z.string().min(5, "Organization name is required"),
    subscribedProduct: z.string().min(1, "Please select a Product to proceed"),
    appDescription: z
      .string()
      .min(10, "Description must be at least 10 characters long")
      .optional(),
    appPlan: z.string().min(1, "Plan is required"),
  });

  const form = useForm({
    defaultValues: {
      appName: "",
      orgName: "",
      subscribedProduct: "",
      appDescription: "",
      appPlan: "",
    },
    onSubmit: async (values) => {
      try {
        // const { orgId } = await createOrganization({
        //   user_id: AppUser?.id ?? "",
        //   name: values.value.appName,
        //   domain: values.value.appDomainUrl,
        //   address: values.value.appDescription,
        //   email: AppUser?.email ?? "",
        // });

        toast.success("Organisation created successfully!", {
          description: "You can now add Applications to your organisation.",
        });
      } catch (error) {
        toast.error("Network error. Please try again later.");
      }
    },
    validators: {
      // @ts-ignore next line
      onChange: formSchema,
    },
  });

  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const getDrpProducts = async () => {
      try {
        setLoading(true);
        const res = await getProducts();
        if (res) setProducts(res);
      } finally {
        setLoading(false);
      }
    };

    getDrpProducts();
  }, []);

  const userOrganizationsOptions = userOrganizations.reduce((acc, org) => {
    acc[org.org_id!] = org.organization_name!;
    return acc;
  }, {} as Record<string, string>);

  return (
    <div className=" p-6 rounded-lg shadow max-w-lg">
      <h2 className="text-xl font-bold text-white mb-4">
        Create New Application
      </h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="space-y-4"
      >
        <div>
          <form.Field name="appName">
            {(field) => {
              return (
                <>
                  <label
                    htmlFor={field.name}
                    className="block text-muted-foreground  mb-1"
                  >
                    Application Name
                  </label>
                  <Input
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <FieldError field={field} />
                </>
              );
            }}
          </form.Field>
        </div>
        <div className="grid grid-cols-[auto_auto] gap-x-2">
          <div className="w-full">
            <form.Field name="orgName">
              {(field) => (
                <>
                  <label
                    className="block text-muted-foreground mb-1"
                    htmlFor={field.name}
                  >
                    Organization
                  </label>
                  <Select>
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
                </>
              )}
            </form.Field>
          </div>
          <div className="w-full">
            <form.Field name="subscribedProduct">
              {(field) => (
                <>
                  <label
                    className="block text-muted-foreground mb-1 underline underline-offset-1"
                    htmlFor={field.name}
                  >
                    <Link href="/products">Products</Link>
                  </label>
                  <Select disabled={loading}>
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
                </>
              )}
            </form.Field>
          </div>
        </div>
        <div>
          <form.Field name="appPlan">
            {(field) => (
              <div className="">
                <Label
                  htmlFor={field.name}
                  className="block text-muted-foreground mb-2"
                >
                  Plan
                </Label>
                <RadioGroup>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="basic" id="basic" />
                    <Label htmlFor="basic" className="">
                      Basic
                    </Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="pro" id="pro" />
                    <Label htmlFor="pro" className="">
                      Pro
                    </Label>
                  </div>
                </RadioGroup>
                <FieldError field={field} />
              </div>
            )}
          </form.Field>
        </div>
        <div>
          <form.Field name="appDescription">
            {(field) => (
              <>
                <label
                  htmlFor={field.name}
                  className="block text-muted-foreground mb-1"
                >
                  Description
                </label>
                <Textarea
                  placeholder="Optional"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  rows={3}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                <FieldError field={field} />
              </>
            )}
          </form.Field>
        </div>
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
        >
          {([canSubmit, isSubmitting]) => (
            <Button className="float-end" type="submit" disabled={!canSubmit}>
              {isSubmitting ? "Creating..." : "Create Application"}
            </Button>
          )}
        </form.Subscribe>
      </form>
    </div>
  );
}

export default NewApplicationFormPage;
