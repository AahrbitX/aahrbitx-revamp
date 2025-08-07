"use client";

import { z } from "zod";
import React from "react";
import { useForm } from "@tanstack/react-form";
import { FieldError } from "@/utils/fieldErrors";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import FormFieldDescription from "../components/form-field-description";
import { useAuthOrg } from "@/providers/auth-org-provider";
import { updateUserData } from "@/actions/user/updateUserData";
import { toast } from "sonner";

const schema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  primary_phone: z.string().min(10, "Primary phone must be at least 10 digits"),
  secondary_phone: z
    .string()
    .min(10, "Secondary phone must be at least 10 digits"),
});

function ProfileForm() {
  const { user: AppUser, setUser: setAppUser } = useAuthOrg();

  if (!AppUser) return;

  const form = useForm({
    defaultValues: {
      username: AppUser?.username || "",
      primary_phone: AppUser?.primary_phone || "",
      secondary_phone: AppUser?.secondary_phone || "",
    },
    onSubmit: async ({ value }) => {
      // Handle form submission
      try {
        if (!AppUser?.id) {
          throw new Error("User ID is not available");
        }
        const data = await updateUserData({
          id: AppUser?.id!,
          username: value.username,
          primary_phone: value.primary_phone,
          secondary_phone: value.secondary_phone,
        });

        setAppUser({
          ...AppUser,
          username: data.username,
          primary_phone: data.phone,
          secondary_phone: data.secondary_phone,
        });

        toast.success("Profile updated successfully", {
          description: "Your profile information has been updated.",
        });
      } catch (error) {
        console.error("Error updating profile:", error);
        toast.error("Failed to update profile", {
          description:
            "There was an error updating your profile. Please try again.",
        });
      }
    },
    validators: {
      // @ts-ignore zod validation
      onChange: schema,
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className="space-y-4"
    >
      <div>
        <form.Field name="username">
          {(field) => (
            <div className="space-y-2">
              <Label htmlFor={field.name}>Username</Label>
              <Input
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                placeholder="Enter your username"
                onChange={(e) => field.handleChange(e.target.value)}
              />
              <FormFieldDescription description="This is your public display name. It can be your real name or a pseudonym." />
              <FieldError field={field} />
            </div>
          )}
        </form.Field>
      </div>

      <div>
        <form.Field name="primary_phone">
          {(field) => (
            <div className="space-y-2">
              <Label htmlFor={field.name}>Primary Phone</Label>
              <Input
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                placeholder="Enter your primary phone number"
                onChange={(e) => field.handleChange(e.target.value)}
              />
              <FormFieldDescription description="This is your primary contact number." />
              <FieldError field={field} />
            </div>
          )}
        </form.Field>
      </div>

      <div>
        <form.Field name="secondary_phone">
          {(field) => (
            <div className="space-y-2">
              <Label htmlFor={field.name}>Secondary Phone</Label>
              <Input
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                placeholder="Enter your secondary phone number"
                onChange={(e) => field.handleChange(e.target.value)}
              />
              <FormFieldDescription description="This is your secondary contact number." />
              <FieldError field={field} />
            </div>
          )}
        </form.Field>
      </div>

      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
      >
        {([canSubmit, isSubmitting]) => (
          <Button type="submit" className="float-end" disabled={!canSubmit}>
            {isSubmitting ? "Submitting..." : "Save Changes"}
          </Button>
        )}
      </form.Subscribe>
    </form>
  );
}

export default ProfileForm;
