"use client";

import z from "zod";
import { Input } from "@/components/ui/input";
import { useForm } from "@tanstack/react-form";
import { Button } from "@/components/ui/button";
import { FieldError } from "@/utils/fieldErrors";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { inviteAppUser } from "@/actions/user/inviteAppUser";
import { useAuthOrg } from "@/providers/auth-org-provider";
import { toast } from "sonner";

const OrgInvitationSchema = z.object({
  email: z.email("Invalid email address"),
  application_id: z.string().min(1, "Application ID is required"),
});

export const InviteForm = ({
  applications,
  orgId,
}: {
  applications: any[];
  orgId: string;
}) => {
  const { user } = useAuthOrg();

  const form = useForm({
    defaultValues: {
      email: "",
      application_id: "",
    },
    onSubmit: async (values) => {
      try {
        // Call the inviteAppUser action with the form values
        await inviteAppUser({
          email: values.value.email,
          organization_id: orgId,
          applicationId: values.value.application_id,
          invitedBy: user?.id!, // Replace with actual user ID
        });
        toast.success("Invite sent successfully!");
      } catch (error) {
        console.error("Error sending invite:", error);
        toast.error("Failed to send invite. Please try again.");
      }
    },
    validators: {
      onChange: OrgInvitationSchema,
    },
  });

  return (
    <form onSubmit={form.handleSubmit} className="space-y-4">
      <form.Field name="email">
        {(field) => (
          <div className="space-y-2">
            <Label htmlFor={field.name}>Email</Label>
            <Input
              type="email"
              id={field.name}
              name={field.name}
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
              placeholder="Enter email"
            />
            <FieldError field={field} />
          </div>
        )}
      </form.Field>
      <form.Field name="application_id">
        {(field) => (
          <div className="space-y-2">
            <Label htmlFor={field.name}>Application</Label>
            <Select onValueChange={(val) => field.handleChange(val)}>
              <SelectTrigger>
                <SelectValue placeholder="Select application" />
              </SelectTrigger>
              <SelectContent>
                {applications.map((app) => (
                  <SelectItem
                    key={app.id}
                    value={app.id}
                    onSelect={() => {
                      field.handleChange(app.id);
                      toast.success(
                        `You have selected ${app.application_name}`
                      );
                    }}
                  >
                    {app.application_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FieldError field={field} />
          </div>
        )}
      </form.Field>
      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
      >
        {([canSubmit, isSubmitting]) => (
          <Button
            type="submit"
            className="float-end"
            disabled={!canSubmit || isSubmitting}
          >
            Send Invite
          </Button>
        )}
      </form.Subscribe>
    </form>
  );
};
