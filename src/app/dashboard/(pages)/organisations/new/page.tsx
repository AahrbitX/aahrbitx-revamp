"use client";

import { z } from "zod";
import React from "react";
import { useAuthOrg } from "@/providers/auth-org-provider";
import { createOrganization } from "@/actions/organizations/post/createOrganization";
import { useForm } from "@tanstack/react-form";
import { FieldError } from "@/utils/fieldErrors";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { redirect } from "next/navigation";

function NewOrganisationCreationPage() {
  // get user and organization data
  const {
    user: AppUser,
    userOrganizationData,
    setUserOrganizationData,
  } = useAuthOrg();

  // create organization form schema
  const formSchema = z.object({
    orgName: z
      .string()
      .min(
        5,
        "Organisation name is required and should be at least 5 characters long"
      ),
    domain: z.string().min(1, "Domain Name Required"),
    orgEmail: z.email("Invalid email address"),
    orgAddress: z.string().optional(),
    contact_no: z.string().optional(),
    shouldReceiveProductUpdates: z.boolean().default(false),
    shouldReceiveMarketingEmails: z.boolean().default(false),
  });

  // initialize form
  const form = useForm({
    defaultValues: {
      orgName: "",
      domain: "",
      orgEmail: "",
      orgAddress: "",
      contact_no: "",
      shouldReceiveProductUpdates: false,
      shouldReceiveMarketingEmails: false,
    },
    // form submission
    onSubmit: async (values) => {
      try {
        const orgUserMapData = await createOrganization({
          user_id: AppUser?.id ?? "",
          name: values.value.orgName,
          domain: values.value.domain,
          address: values.value.orgAddress,
          email: AppUser?.email ?? "",
        });
        // update user organization data
        setUserOrganizationData([...userOrganizationData, orgUserMapData]);

        toast.success("Organisation created successfully!", {
          description: "You can now add Applications to your organisation.",
        });

        redirect("/dashboard");
      } catch (error) {
        toast.error("Network error. Please try again later.");
      }
    },
    validators: {
      // @ts-ignore next line
      onChange: formSchema,
    },
  });

  return (
    <div className=" p-6 rounded-lg shadow max-w-lg">
      <h2 className="text-xl font-bold text-white mb-4">
        Create New Organisation
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
          <form.Field name="orgName">
            {(field) => {
              return (
                <>
                  <label
                    htmlFor={field.name}
                    className="block text-muted-foreground  mb-1"
                  >
                    Organisation Name
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
        <div>
          <form.Field name="domain">
            {(field) => (
              <>
                <label
                  className="block text-muted-foreground mb-1"
                  htmlFor={field.name}
                >
                  Domain
                </label>
                <Input
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                <FieldError field={field} />
              </>
            )}
          </form.Field>
        </div>
        <div>
          <form.Field name="orgEmail">
            {(field) => (
              <>
                <label
                  htmlFor={field.name}
                  className="block text-muted-foreground mb-1"
                >
                  Email
                </label>
                <Input
                  type="email"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                <FieldError field={field} />
              </>
            )}
          </form.Field>
        </div>
        <div>
          <form.Field name="orgAddress">
            {(field) => (
              <>
                <label
                  htmlFor={field.name}
                  className="block text-muted-foreground mb-1"
                >
                  Address
                </label>
                <Textarea
                  placeholder="Optional"
                  value={field.state.value}
                  onBlur={field.handleBlur}
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
              {isSubmitting ? "Creating..." : "Create Organisation"}
            </Button>
          )}
        </form.Subscribe>
      </form>
    </div>
  );
}

export default NewOrganisationCreationPage;
