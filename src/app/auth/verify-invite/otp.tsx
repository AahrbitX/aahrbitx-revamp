"use client";

import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { useForm } from "@tanstack/react-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FieldError } from "@/utils/fieldErrors";
import { acceptInviteFromRedirect } from "./verify-invitation";

const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

export function OTPVerificationForm({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const form = useForm({
    defaultValues: {
      pin: "",
    },
    onSubmit: async (values) => {
      await acceptInviteFromRedirect({
        searchParams: searchParams,
        otp: values.value.pin,
      });
      toast.success("OTP submitted successfully!", {
        description: "You are now verified.",
      });
    },
    validators: {
      onChange: FormSchema,
    },
  });

  return (
    <div className="flex flex-col items-center justify-center h-[100vh] ">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <form.Field name="pin">
          {(field) => (
            <div className="space-y-4 min-w-xs">
              <Label htmlFor={field.name}>Enter your OTP</Label>
              <Input
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                maxLength={6}
              />
              <FieldError field={field} />
            </div>
          )}
        </form.Field>
        <Button type="submit" className="mt-4">
          Submit
        </Button>
      </form>
    </div>
  );
}
