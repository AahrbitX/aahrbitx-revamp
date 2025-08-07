"use client";

import { z } from "zod";
import React, { useEffect, useState } from "react";
import { useAuthOrg } from "@/providers/auth-org-provider";
import { createOrganization } from "@/actions/organizations/post/createOrganization";
import { useForm } from "@tanstack/react-form";
import { FieldError } from "@/utils/fieldErrors";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useRouter, useSearchParams } from "next/navigation";
import { getOrganisationData } from "@/actions/organizations/getOrganizationData";
import { updateOrganization } from "@/actions/organizations/post/updateOrganization";

const formSchema = z.object({
  orgName: z
    .string()
    .min(
      5,
      "Organisation name is required and should be at least 5 characters long"
    )
    .max(12, "Organisation name should not exceed 12 characters"),
  domain: z.string().min(1, "Domain Name Required"),
  orgEmail: z.email("Invalid email address"),
  orgAddress: z.string().optional(),
  contact_no: z.string().optional(),
  shouldReceiveProductUpdates: z.boolean().default(false),
  shouldReceiveMarketingEmails: z.boolean().default(false),
});

function NewOrganisationCreationPage() {
  const {
    user: AppUser,
    userOrganizationData,
    setUserOrganizationData,
    setCurrentSelector,
  } = useAuthOrg();
  const searchParams = useSearchParams();
  const orgId = searchParams.get("orgId");

  const router = useRouter();

  const isAuthorized = userOrganizationData.some(
    (org) => org.org_id === orgId && org.user_role === "superadmin"
  );

  const [editingOrganization, setEditingOrganization] = useState<any>(null);

  useEffect(() => {
    const getOrg = async () => {
      if (orgId) {
        const orgData = await getOrganisationData(orgId);
        if (orgData && orgData.length > 0) {
          setEditingOrganization(orgData[0]);
        }
      }
    };
    getOrg();
  }, [orgId]);

  const form = useForm({
    defaultValues: {
      orgName: editingOrganization?.name ?? "",
      domain: editingOrganization?.domain ?? "",
      orgEmail: editingOrganization?.email ?? "",
      orgAddress: editingOrganization?.address ?? "",
      contact_no: editingOrganization?.contact_no ?? "",
    },
    onSubmit: async (values) => {
      try {
        const payload = {
          user_id: AppUser?.id ?? "",
          name: values.value.orgName,
          domain: values.value.domain,
          address: values.value.orgAddress,
          email: values.value.orgEmail,
        };

        if (editingOrganization && orgId) {
          const orgUserMapUpdateData = await updateOrganization(orgId, payload);

          const removedUserOrganizationData = userOrganizationData.filter(
            (org) => org.org_id !== orgId
          );

          setUserOrganizationData([
            ...removedUserOrganizationData,
            ...orgUserMapUpdateData,
          ]);

          setCurrentSelector(
            orgUserMapUpdateData.find((org) => org.user_role === "superadmin")!
          );

          toast.success("Organisation Data updated successfully!", {
            description: "You can edit the organization details further.",
          });
          // Redirect to the updated organization page
          router.push(`/dashboard/organisations/${orgId}`);
        } else {
          const orgUserMapData = await createOrganization(payload);

          setUserOrganizationData([...userOrganizationData, orgUserMapData]);

          toast.success("Organisation created successfully!", {
            description: "You can now add Applications to your organisation.",
          });

          // Redirect to the new organization page
          router.push(`/dashboard/organisations/${orgUserMapData.org_id}`);
        }
      } catch (error) {
        console.log("Error creating/updating organization:", error);
        toast.error("Network error. Please try again later.");
      }
    },
    validators: {
      // @ts-ignore zod validation
      onChange: formSchema,
    },
  });

  if (!isAuthorized && editingOrganization) {
    return (
      <div className="">
        You do not have permission to create or edit organizations.
      </div>
    );
  }

  return (
    <div className="p-6 rounded-lg shadow max-w-lg">
      <h2 className="text-xl font-bold text-white mb-4">
        {orgId ? "Edit Organisation" : "Create New Organisation"}
      </h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="space-y-4"
      >
        <form.Field name="orgName">
          {(field) => (
            <>
              <label
                className="block text-muted-foreground mb-1"
                htmlFor={field.name}
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
          )}
        </form.Field>

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

        <form.Field name="orgEmail">
          {(field) => (
            <>
              <label
                className="block text-muted-foreground mb-1"
                htmlFor={field.name}
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

        <form.Field name="orgAddress">
          {(field) => (
            <>
              <label
                className="block text-muted-foreground mb-1"
                htmlFor={field.name}
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

        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
        >
          {([canSubmit, isSubmitting]) => (
            <Button type="submit" className="float-end" disabled={!canSubmit}>
              {isSubmitting
                ? "Submitting..."
                : orgId
                ? "Update"
                : "Create Organisation"}
            </Button>
          )}
        </form.Subscribe>
      </form>
    </div>
  );
}

export default NewOrganisationCreationPage;
